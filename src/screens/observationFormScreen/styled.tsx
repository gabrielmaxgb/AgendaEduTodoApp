import styled from "styled-components/native";

export const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary || '#ccc'};
  margin-vertical: 12px;
  min-height: 80px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

export const StyledHeaderText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
  font-weight: bold;
  margin-bottom: 16px;
`;