import React from 'react';
import { ButtonActivityIndicator, ButtonText, StyledButton } from './styled';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  style,
}) => (
  <StyledButton onPress={onPress} disabled={disabled || loading} style={style}>
    <ButtonText>{title}</ButtonText>
    {loading && <ButtonActivityIndicator size="small" color="white" />}
  </StyledButton>
);

export default Button;
