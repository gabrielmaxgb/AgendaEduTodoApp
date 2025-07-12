import styled from "styled-components/native";
import FloatingButton from "../../components/common/floatingButton/FloatingButton";

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

export const FieldLabel = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
  font-weight: bold;
  margin-top: 10px;
`;

export const ActionArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 16px;
  padding-horizontal: 16px;
  width: 100%;
  padding: 8px;
`;

export const FavFloatingButton = styled(FloatingButton)`
  position: absolute;
  right: 24px;
  bottom: 96px;
  background-color: ${({ theme }) => theme.colors.primary || '#6200ee'};
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: ${({ theme, disabled }) => 
    disabled ? theme.colors.textLight : theme.colors.primary || '#6200ee'};
  flex-direction: row;
  padding-horizontal: 20px;
  padding-vertical: 14px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
`;

export const SaveButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
`;

export const SaveButtonActivityIndicator = styled.ActivityIndicator`
  margin-left: 8px;
`;
