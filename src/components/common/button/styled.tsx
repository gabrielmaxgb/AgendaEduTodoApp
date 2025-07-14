import styled from "styled-components/native";

export const StyledButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.textLight : theme.colors.primary || '#6200ee'};
  padding-vertical: 14px;
  padding-horizontal: 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  font-weight: bold;
`;

export const ButtonActivityIndicator = styled.ActivityIndicator`
  margin-left: 8px;
`;