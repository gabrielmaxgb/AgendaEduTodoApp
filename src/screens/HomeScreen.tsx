import React from 'react';
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
  const { data, isLoading } = useObservationList();
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        data &&  data.length === 0
          ? <EmptyState 
              title="Sem observações ainda" 
              description='Você ainda não cadastrou nenhuma observação. Toque no botão "+" para começar!' 
            />
          : (
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <ObservationCard
                  data={item}
                  onPress={() => {
                    navigation.navigate('ObservationForm', {
                      id: item.id,
                    });
                  }}
                  onToggleFavorite={(id) => console.log('Favoritar ID:', id)}
                />
              )}
            />
          )
      }
      
      <FloatingButton onPress={() => navigation.navigate('ObservationForm', {})}>
        <Ionicons name="add" size={32} color={theme.colors.secondary} />
      </FloatingButton>
    </Container>
  );
}
