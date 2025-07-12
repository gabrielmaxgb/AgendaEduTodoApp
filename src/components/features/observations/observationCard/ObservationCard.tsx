import React from 'react';
import { useTheme } from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TObservation } from '../../../../types/observation';
import { truncateString } from '../../../../helpers';
import { Card, ClassName, Description, FavoriteButton, StudentName } from './styled';

interface ObservationCardProps {
  data: TObservation;
  onPress?: () => void;
  onToggleFavorite?: (id: TObservation['id']) => void;
}

export default function ObservationCard(props: ObservationCardProps) {
  const {
    data,
    onPress,
    onToggleFavorite,
  } = props;

  const theme = useTheme();

  return (
    <Card onPress={onPress}>
      <FavoriteButton
        onPress={() => onToggleFavorite?.(data.id)}
      >
        <Ionicons
          name={data.isFavorite ? 'star' : 'star-outline'}
          size={24}
          color={data.isFavorite ? theme.colors.warning : theme.colors.textLight}
        />
      </FavoriteButton>
      <StudentName>{data.student.name}</StudentName>
      <ClassName>{data.student.class.name}</ClassName>
      <Description>
        {truncateString(data.description, 100)}
      </Description>
    </Card>
  );
}
