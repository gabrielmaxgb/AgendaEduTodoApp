import styled from "styled-components/native";

export const ToastContainer = styled.View<{ bgColor: string }>`
  height: 60px;
  background-color: ${props => props.bgColor};
  justify-content: center;
  padding-horizontal: 16px;
  border-radius: 8px;
  margin: 8px;
`;

export const ToastTextBold = styled.Text`
  color: white;
  font-weight: bold;
`;

export const ToastText = styled.Text`
  color: white;
`;
