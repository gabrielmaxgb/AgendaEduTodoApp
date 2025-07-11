import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useObservations } from '../queries/observations';
import Container from '../components/common/Container';
import ObservationCard from '../components/observations/ObservationCard';
import EmptyState from '../components/common/EmptyState';


const Separator = () => <View style={{ height: 12 }} />;

export default function HomeScreen() {
  const { data, isLoading } = useObservations();

  if (isLoading) {
    return <Text>Carregando...</Text>;
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
            onPress={() => console.log('Ir para detalhes', item.id)}
            onToggleFavorite={(id) => console.log('Favoritar ID:', id)}
          />
        )}
        ItemSeparatorComponent={Separator}
      />
    </Container>
  );
}
