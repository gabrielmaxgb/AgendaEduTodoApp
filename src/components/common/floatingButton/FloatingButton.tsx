import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button } from './styled';

const FloatingButton: React.FC<TouchableOpacityProps> = ({ children, ...props }) => (
  <Button activeOpacity={0.8} {...props}>
    {children}
  </Button>
);

export default FloatingButton;
