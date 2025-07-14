import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: start;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.secondary || '#fff'};
`;

export const ScreenTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text || '#000'};
  font-size: ${({ theme }) => theme.fontSizes.large}px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ScreenSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text || '#000'};
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text || '#000'};
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Separator = styled.View`
  height: 10px;
  width: 100%;
  background-color: transparent;
`;
