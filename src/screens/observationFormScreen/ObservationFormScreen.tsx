import React, { useEffect, useState } from 'react';
import { Button, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useCreateObservation, useDeleteObservation, useObservationById, useUpdateObservation } from '../../queries/observations';
import Container from '../../components/common/Container';
import { generateRandomId } from '../../helpers';
import FloatingButton from '../../components/common/floatingButton/FloatingButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StudentSelect from '../../components/features/students/StudentSelect';
import { SelectOption } from '../../components/common/select/Select';
import ClassSelect from '../../components/features/classes/ClassSelect';
import { StyledHeaderText, StyledTextInput } from './styled';

type ObservationFormScreenRouteProp = RouteProp<RootStackParamList, 'ObservationForm'>;

export default function ObservationFormScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ObservationFormScreenRouteProp>();
  const observationId = route.params?.id;
  const theme = useTheme();
  const [selectedClass, setSelectedClass] = useState<SelectOption>();
  const [selectedStudent, setSelectedStudent] = useState<SelectOption>();
  const { data: observation, isLoading } = useObservationById(observationId ?? '', {});
  const { mutate: createObservation, isPending: isCreatingObservation } = useCreateObservation();
  const { mutate: updateObservation, isPending: isUpdatingObservation } = useUpdateObservation();
  const { mutate: deleteObservation } = useDeleteObservation();
  const [observationFields, setObservationFields] = useState({
    text: '',
    isFavorite: false,
  });

  useEffect(() => {
    if (observation) {
      setObservationFields({
        text: observation.description || '',
        isFavorite: observation.isFavorite || false,
      });
    }
  }, [observation]);

  const handleSave = () => {
    if (observationId && observation) {
      updateObservation(
        {
          ...observation,
          description: observationFields.text,
          isFavorite: observationFields.isFavorite,
        },
        {
          onSuccess: () => {
            navigation.goBack()
            Alert.alert('Sucesso ao atualizar observação')
          },
          onError: () => Alert.alert('Erro ao atualizar observação'),
        }
      );
    } else {
      createObservation(
        {
          id: generateRandomId(),
          description: observationFields.text,
          isFavorite: false,
          student: {
            id: generateRandomId(),
            name: selectedStudent?.label || '',
            class: { 
              id: generateRandomId(),
              name: selectedClass?.label || '', 
            }
          }
        },
        {
          onSuccess: () => {
            navigation.goBack()
            Alert.alert('Sucesso ao criar observação')
          },
          onError: () => Alert.alert('Erro ao criar observação'),
        }
      );
    }
  };

  const handleDeleteObservation = () => {
    if (observationId) {
      deleteObservation(
        observationId,
        {
          onSuccess: () => {
            navigation.goBack();
            Alert.alert('Sucesso ao excluir observação');
          }
          ,
          onError: () => Alert.alert('Erro ao excluir observação'),
        }
      )
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <StyledHeaderText>{observationId ? 'Editar Observação' : 'Nova Observação'}</StyledHeaderText>

      {
        (!observationId) && (
          <>
            <ClassSelect
              value={selectedClass?.value}
              onSelect={setSelectedClass}
              placeholder="Escolha uma classe"
            />

            {
              selectedClass && (
                <StudentSelect
                  value={selectedStudent?.value}
                  onSelect={setSelectedStudent}
                  placeholder="Escolha um estudante"
                />
              )
            }
          </>
        )
      }

      <StyledTextInput
        value={observationFields.text}
        onChangeText={text => setObservationFields({ ...observationFields, text })}
        multiline
        numberOfLines={8}
        placeholder="Digite a observação"
        placeholderTextColor="#999"
      />
      {
        observationId &&
        <Button
          title={observationFields.isFavorite ? 'Desfavoritar' : 'Favoritar'}
          onPress={() => setObservationFields(fields => ({
            ...fields,
            isFavorite: !fields.isFavorite
          }))}
        />
      }
      {
        isCreatingObservation || isUpdatingObservation
          ? <ActivityIndicator />
          : <Button title="Salvar" onPress={handleSave} />
      }

      {
        observationId &&
        <FloatingButton onPress={() => handleDeleteObservation()}>
          <Ionicons name="trash" size={32} color={theme.colors.secondary} />
        </FloatingButton>
      }
    </Container>
  );
}