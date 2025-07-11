import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Observation } from '../../types/observation';

interface Props {
  data: Observation;
  onPress?: () => void;
  onToggleFavorite?: (id: number) => void;
}

const Card = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.cardBackground || '#fff'};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary || '#ddd'};
  
`;

const StudentName = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.large}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.Text`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.text};
`;

const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
`;

export default function ObservationCard({
  data,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <Card onPress={onPress}>
      <FavoriteButton
        onPress={() => onToggleFavorite?.(data.id)}
      >
        <Ionicons
          name={data.isFavorite ? 'star' : 'star-outline'}
          size={24}
          color={data.isFavorite ? '#FF9F1C' : '#999'}
        />
      </FavoriteButton>
      <StudentName>{data.student.name}</StudentName>
      <Description>{data.description}</Description>
    </Card>
  );
}
