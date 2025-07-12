import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large}px;
  background-color: transparent;
`;

export const IconWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.medium}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.large}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.textLight};
  text-align: center;
`;

export const DefaultIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.primary}22;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium}px;
`;

export const DefaultIconText = styled.Text`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.primary};
`;
