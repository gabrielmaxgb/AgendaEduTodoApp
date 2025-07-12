import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  bottom: 24px;
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