import styled from "styled-components/native";

interface SelectContainerProps {
  disabled?: boolean;
}

export const SelectContainer = styled.TouchableOpacity<SelectContainerProps>`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary || '#ccc'};
  border-radius: 4px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  min-height: 48px;
  justify-content: center;
  margin-vertical: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const SelectText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

export const PlaceholderText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.textLight || '#999'};
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  border-radius: 8px;
  width: 80%;
  max-height: 70%;
`;

export const ModalHeader = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#ccc'};
`;

export const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.large}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

export const OptionItem = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#eee'};
`;

export const OptionText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border || '#ccc'};
`;

export const CloseButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.primary || '#007AFF'};
  font-weight: bold;
`;
