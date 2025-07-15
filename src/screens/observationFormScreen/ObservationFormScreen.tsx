import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useCreateObservation, useDeleteObservation, useObservationById, useUpdateObservation } from '../../hooks/queries/observations';
import { generateRandomId } from '../../helpers';
import FloatingButton from '../../components/common/floatingButton/FloatingButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import StudentSelect from '../../components/features/students/StudentSelect';
import { SelectOption } from '../../components/common/select/Select';
import ClassSelect from '../../components/features/classes/ClassSelect';
import { ActionArea, FavFloatingButton, StyledTextInput, FieldLabel } from './styled';
import ObservationCard from '../../components/features/observations/observationCard/ObservationCard';
import { Container, Title } from '../../components/common';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/button/Button';
import { useToast } from '../../hooks/custom/useToast';

type ObservationFormScreenRouteProp = RouteProp<RootStackParamList, 'ObservationForm'>;

interface TObservationFormFields {
  text: string;
  isFavorite: boolean;
  selectedClass?: SelectOption | undefined;
  selectedStudent?: SelectOption | undefined;
};

const OBSERVATION_FORM_INITIAL_STATE: TObservationFormFields = {
  text: '',
  isFavorite: false,
  selectedClass: undefined,
  selectedStudent: undefined,
};

export default function ObservationFormScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ObservationFormScreenRouteProp>();
  const observationId = route.params?.id;
  const theme = useTheme();
  const { data: observation, isLoading: gettingObservationById } = useObservationById(observationId, {
    enabled: !!observationId,
  });
  const { mutate: createObservation, isPending: isCreatingObservation } = useCreateObservation();
  const { mutate: updateObservation, isPending: isUpdatingObservation } = useUpdateObservation();
  const { mutate: deleteObservation } = useDeleteObservation();
  const { showToast } = useToast();
  const [observationFormFields, setObservationFields] = useState<TObservationFormFields>(OBSERVATION_FORM_INITIAL_STATE);

  const isEditingObservation = useMemo(() => {
    return !!observationId && !!observation;
  }, [observationId, observation]);

  const isCreatingNewObservation = useMemo(() => {
    return !observationId && !observation;
  }, [observationId, observation]);

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

  const toggleFavorite = useCallback(() => {
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
            showToast({
              type: 'success',
              text1: 'Observação atualizada',
              text2: newValue
                ? 'Observação favoritada com sucesso'
                : 'Observação desfavoritada com sucesso',
            });
          },
          onError: () => {
            showToast({
              type: 'error',
              text1: 'Erro ao atualizar observação',
              text2: 'Não foi possível atualizar o status de favorito',
            });
          },
        }
      );
    }
  }, [
    observationFormFields.isFavorite,
    observationId,
    observation,
    updateObservation,
    showToast,
  ]);

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
            showToast({
              type: 'success',
              text1: 'Observação atualizada',
              text2: 'Observação atualizada com sucesso',
            });
          },
          onError: () => {
            showToast({
              type: 'error',
              text1: 'Erro ao atualizar observação',
              text2: 'Não foi possível atualizar a observação',
            });
          },
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
            showToast({
              type: 'success',
              text1: 'Observação criada',
              text2: 'Observação criada com sucesso',
            });
          },
          onError: () => {
            showToast({
              type: 'error',
              text1: 'Erro ao criar observação',
              text2: 'Não foi possível criar a observação',
            });
          },
        }
      );
    }
  };

  const handleClassSelect = (selectedClass: SelectOption) => {
    setObservationFields((prev) => ({
      ...prev,
      selectedClass,
      selectedStudent: undefined,
    }));
  };  

  const handleDeleteObservation = useCallback(() => {
    if (observationId) {
      deleteObservation(
        observationId,
        {
          onSuccess: () => {
            navigation.goBack();
            showToast({
              type: 'success',
              text1: 'Observação excluída',
              text2: 'Observação excluída com sucesso',
            });
          },
          onError: () => {
            showToast({
              type: 'error',
              text1: 'Erro ao excluir observação',
              text2: 'Não foi possível excluir a observação',
            });
          },
        }
      )
    }
  }, [observationId, deleteObservation, navigation, showToast]);
  
  const handleChangeText = useCallback((text: string) => {
    setObservationFields((prev) => ({
      ...prev,
      text,
    }));
  }, []);

  if (gettingObservationById) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title={observationId ? 'Editar Observação' : 'Nova Observação'}
        subtitle={observationId ? 'Edite os detalhes da observação' : 'Preencha os detalhes da nova observação'}
      />

      {
        isEditingObservation && (
          <>
            <Title>Aluno:</Title>
            <ObservationCard
              data={observation ? observation : {
                id: '',
                description: 'Sem descrição',
                isFavorite: false,
                student: {
                  id: '',
                  name: 'Aluno não indentificado',
                  class: {
                    id: '',
                    name: 'Classe não identificada',
                  },
                },
              }}
              hideFavoriteButton
              hideDescription
            />
          </>
        )
      }

      {
        (isCreatingNewObservation) && (
          <>
          <ClassSelect
            value={observationFormFields.selectedClass?.value}
            onSelect={handleClassSelect}
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
        onChangeText={handleChangeText}
        multiline
        numberOfLines={8}
        placeholder="Digite a observação"
        placeholderTextColor="#999"
      />
      <ActionArea>
        <Button 
          onPress={handleSave} 
          disabled={isSaveButtonDisabled} 
          title='Salvar' 
          loading={isCreatingObservation || isUpdatingObservation}
        />
      </ActionArea>

      {
        isEditingObservation &&
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
          <FloatingButton onPress={handleDeleteObservation} style={{ backgroundColor: theme.colors.error }}>
            <Ionicons name="trash" size={32} color={theme.colors.background} />
          </FloatingButton>
        </>
      }
    </Container>
  );
}