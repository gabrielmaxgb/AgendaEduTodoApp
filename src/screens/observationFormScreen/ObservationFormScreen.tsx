import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
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
import { ActionArea, FavFloatingButton, SaveButton, SaveButtonText, SaveButtonActivityIndicator, StyledHeaderText, StyledTextInput, FieldLabel } from './styled';
import ObservationCard from '../../components/features/observations/observationCard/ObservationCard';

type ObservationFormScreenRouteProp = RouteProp<RootStackParamList, 'ObservationForm'>;

export default function ObservationFormScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ObservationFormScreenRouteProp>();
  const observationId = route.params?.id;
  const theme = useTheme();
  const { data: observation, isLoading } = useObservationById(observationId, {
    enabled: !!observationId,
  });
  const { mutate: createObservation, isPending: isCreatingObservation } = useCreateObservation();
  const { mutate: updateObservation, isPending: isUpdatingObservation } = useUpdateObservation();
  const { mutate: deleteObservation } = useDeleteObservation();
  const [observationFormFields, setObservationFields] = useState<{
    text: string;
    isFavorite: boolean;
    selectedClass: SelectOption | undefined;
    selectedStudent: SelectOption | undefined;
  }>({
    text: '',
    isFavorite: false,
    selectedClass: undefined,
    selectedStudent: undefined,
  });

  const isSaveButtonDisabled = useMemo(() => {
    const hasText = observationFormFields.text.trim();
    const hasRequiredFields = observationId || (observationFormFields.selectedClass && observationFormFields.selectedStudent);
    
    if (observationId && observation) {
      const originalText = observation.description || '';
      const hasTextChanged = observationFormFields.text.trim() !== originalText.trim();
      return !hasText || !hasTextChanged;
    }
    
    return !hasText || !hasRequiredFields;
  }, [observationFormFields, observationId, observation]);

  useEffect(() => {
    if (observation) {
      setObservationFields({
        text: observation.description || '',
        isFavorite: observation.isFavorite || false,
        selectedClass: {
          value: observation.student?.class?.id || '',
          label: observation.student?.class?.name || '',
        },
        selectedStudent: {
          value: observation.student?.id || '',
          label: observation.student?.name || '',
        }
      });
    }
  }, [observation]);

  const toggleFavorite = () => {
    const newValue = !observationFormFields.isFavorite;
  
    setObservationFields((fields) => ({
      ...fields,
      isFavorite: newValue,
    }));
  
    if (observationId && observation) {
      updateObservation(
        {
          ...observation,
          isFavorite: newValue,
        },
        {
          onSuccess: () => {
            // Alert.alert('Observação favoritada com sucesso');
          },
          onError: () => Alert.alert('Erro ao atualizar observação'),
        }
      );
    }
  };
  

  const handleSave = () => {
    if (observationId && observation) {
      updateObservation(
        {
          ...observation,
          description: observationFormFields.text,
          isFavorite: observationFormFields.isFavorite,
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
          description: observationFormFields.text,
          isFavorite: false,
          student: {
            id: generateRandomId(),
            name: observationFormFields.selectedStudent?.label?.trim() || '',
            class: { 
              id: generateRandomId(),
              name: observationFormFields.selectedClass?.label?.trim() || '', 
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
        observationId && observation && (
          <ObservationCard
            data={observation}
            hideFavoriteButton
            hideDescription
          />
        )
      }
      {
        (!observationId) && (
          <>
          <ClassSelect
            value={observationFormFields.selectedClass?.value}
            onSelect={(selectedClass) => {
              setObservationFields((prev) => ({
                ...prev,
                selectedClass,
                selectedStudent: undefined,
              }));
            }}
            placeholder="Escolha uma classe"
          />
          <StudentSelect
            value={observationFormFields.selectedStudent?.value}
            onSelect={(selectedStudent) => {
              setObservationFields((prev) => ({
                ...prev,
                selectedStudent,
              }));
            }}
            disabled={!observationFormFields.selectedClass}
            placeholder="Escolha um estudante"
          />
          </>
        )
      }

      <FieldLabel>Observação:</FieldLabel>
      <StyledTextInput
        value={observationFormFields.text}
        onChangeText={text => setObservationFields({ ...observationFormFields, text })}
        multiline
        numberOfLines={8}
        placeholder="Digite a observação"
        placeholderTextColor="#999"
      />

      <ActionArea>
        <SaveButton onPress={handleSave} disabled={isSaveButtonDisabled}>
          <SaveButtonText>Salvar</SaveButtonText>
          {(isCreatingObservation || isUpdatingObservation) && (
            <SaveButtonActivityIndicator size="small" color="white" />
          )}
        </SaveButton>
      </ActionArea>

      {
        observationId &&
        <>
          <FavFloatingButton
            onPress={toggleFavorite}
          >
            {
              isUpdatingObservation
                ? <ActivityIndicator size="small" color={theme.colors.background} />
                : (
                  <Ionicons
                    name={observationFormFields.isFavorite ? 'star' : 'star-outline'}
                    size={32}
                    color={theme.colors.terciary}
                  />
                )
            }
          </FavFloatingButton>
          <FloatingButton onPress={() => handleDeleteObservation()} style={{ backgroundColor: theme.colors.error }}>
            <Ionicons name="trash" size={32} color={theme.colors.background} />
          </FloatingButton>
        </>
      }
    </Container>
  );
}