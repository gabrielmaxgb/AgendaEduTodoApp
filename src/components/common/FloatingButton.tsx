import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacityProps } from 'react-native';

const Button = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  bottom: 24px;
  background-color: ${({ theme }) => theme.colors.primary || '#007AFF'};
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

const FloatingButton: React.FC<TouchableOpacityProps> = ({ children, ...props }) => (
  <Button activeOpacity={0.8} {...props}>
    {children}
  </Button>
);

export default FloatingButton;
