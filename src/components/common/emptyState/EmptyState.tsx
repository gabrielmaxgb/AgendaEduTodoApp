import React from 'react';
import { DefaultIcon, DefaultIconText, Description, IconWrapper, Title, Wrapper } from './styled';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nada aqui ainda',
  description = 'Não encontramos nenhum item para mostrar.',
  icon,
}) => {

  const theme = useTheme();

  return (
    <Wrapper>
      <IconWrapper>
        {icon ? (
          icon
        ) : (
          <DefaultIcon>
            <DefaultIconText>
              <Ionicons name="file-tray-outline" size={32} color={theme.colors.primary} />
            </DefaultIconText>
          </DefaultIcon>
        )}
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default EmptyState;
