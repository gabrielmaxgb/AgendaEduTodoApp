import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Container from '../components/common/Container';
import ObservationCard from '../components/features/observations/observationCard/ObservationCard';
import EmptyState from '../components/common/emptyState/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useObservationList } from '../queries/observations';
import FloatingButton from '../components/common/floatingButton/FloatingButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

export default function HomeScreen() {
  const { data: observationsList, isLoading } = useObservationList();
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const favoriteItems = useMemo(() => {
    return observationsList ? observationsList.filter(item => item.isFavorite) : [];
  }, [observationsList]);

  const notFavoriteItems = useMemo(() => {
    return observationsList ? observationsList.filter(item => !item.isFavorite) : [];
  }, [observationsList]);

  const favoritesFirst = useMemo(() => {
    return [...favoriteItems, ...notFavoriteItems];
  }, [favoriteItems, notFavoriteItems]);

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    )
  }

  return (
    <Container>
      {
        observationsList &&  observationsList?.length === 0
          ? <EmptyState 
              title="Sem observações ainda" 
              description='Você ainda não cadastrou nenhuma observação. Toque no botão "+" para começar!' 
            />
          : (
            <>
              <FlatList
                data={favoritesFirst}
                keyExtractor={(item) => String(item.id)}
                contentContainerStyle={{ paddingBottom: 66 }}
                renderItem={({ item }) => (
                  <ObservationCard
                    data={item}
                    onPress={() => {
                      navigation.navigate('ObservationForm', {
                        id: item.id,
                      });
                    }}
                  />
                )}
              />
            </>
          )
      }
      
      <FloatingButton onPress={() => navigation.navigate('ObservationForm', { id: undefined })}>
        <Ionicons name="add" size={32} color={theme.colors.secondary} />
      </FloatingButton>
    </Container>
  );
}
