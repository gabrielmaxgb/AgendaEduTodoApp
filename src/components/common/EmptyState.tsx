import React from 'react';
import styled from 'styled-components/native';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large}px;
  background-color: transparent;
`;

const IconWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.medium}px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.large}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const Description = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
`;

const DefaultIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.primary}22;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium}px;
`;

const DefaultIconText = styled.Text`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
`;

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nada aqui ainda',
  description = 'Não encontramos nenhum item para mostrar.',
  icon,
}) => {
  return (
    <Wrapper>
      <IconWrapper>
        {icon ? (
          icon
        ) : (
          <DefaultIcon>
            <DefaultIconText>🗒️</DefaultIconText>
          </DefaultIcon>
        )}
      </IconWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default EmptyState;
