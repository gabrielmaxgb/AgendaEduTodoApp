import styled from "styled-components/native";

export const Card = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.cardBackground || '#fff'};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  position: relative;
  `;

export const StudentName = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const ClassName = styled.Text`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  color: ${({ theme }) => theme.colors.textLight || '#666'};
  font-style: italic;
`;

export const Description = styled.Text`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  top: 12px;
  right: 12px;
`;