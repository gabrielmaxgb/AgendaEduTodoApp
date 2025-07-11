import React, { useEffect, useState } from 'react';
import { Button, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useCreateObservation, useObservationById, useUpdateObservation } from '../queries/observations';
import Container from '../components/common/Container';
import { generateRandomId } from '../helpers';
import FloatingButton from '../components/common/FloatingButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary || '#ccc'};
  margin-vertical: 12px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

const StyledHeaderText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
  font-weight: bold;
`;

type ObservationFormScreenRouteProp = RouteProp<RootStackParamList, 'ObservationForm'>;

export default function ObservationFormScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ObservationFormScreenRouteProp>();
  const observationId = route.params?.id;
  const theme = useTheme();

  const { data: observation, isLoading } = useObservationById(observationId ?? '', {});
  const { mutate: createObservation, isPending: isCreatingObservation } = useCreateObservation();
  const { mutate: updateObservation, isPending: isUpdatingObservation } = useUpdateObservation();
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
            name: '',
            class: { 
              id: generateRandomId(),
              name: '' 
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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <StyledHeaderText>{observationId ? 'Editar Observação' : 'Nova Observação'}</StyledHeaderText>
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
      <FloatingButton onPress={() => navigation.navigate('ObservationForm', {})}>
        <Ionicons name="trash" size={32} color={theme.colors.secondary} />
      </FloatingButton>
    </Container>
  );
}