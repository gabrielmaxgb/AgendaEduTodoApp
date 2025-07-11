import React, { useEffect, useState } from 'react';
import { TextInput, Button, Text, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useCreateObservation, useObservationById, useUpdateObservation } from '../queries/observations';
import Container from '../components/common/Container';
import { generateRandomId } from '../helpers';

type ObservationFormScreenRouteProp = RouteProp<RootStackParamList, 'ObservationForm'>;

export default function ObservationFormScreen() {
  const navigation = useNavigation();
  const route = useRoute<ObservationFormScreenRouteProp>();
  const observationId = route.params?.id;

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
      <Text>{observationId ? 'Editar Observação' : 'Nova Observação'}</Text>
      {/* <Text>
        { `${!!observationId && !!observation}` }
      </Text> */}
      <TextInput
        value={observationFields.text}
        onChangeText={text => setObservationFields({ ...observationFields, text })}
        multiline
        numberOfLines={4}
        placeholder="Digite a observação"
        style={{ borderWidth: 1, borderColor: '#ccc', marginVertical: 12, padding: 8 }}
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
    </Container>
  );
}