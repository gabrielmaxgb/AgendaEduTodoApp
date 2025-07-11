import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Container from '../components/common/Container';
import ObservationCard from '../components/observations/ObservationCard';
import EmptyState from '../components/common/EmptyState';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useObservationList } from '../queries/observations';
import FloatingButton from '../components/common/FloatingButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const { data, isLoading } = useObservationList();
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
          ? <EmptyState />
          : null
      }
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
        // ItemSeparatorComponent={Separator}
      />
      
      <FloatingButton onPress={() => {}}>
        <Ionicons name="add" size={32} color="#fff" />
      </FloatingButton>
    </Container>
  );
}
