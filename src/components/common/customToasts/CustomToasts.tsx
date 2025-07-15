import React from 'react';
import { ToastContainer, ToastText, ToastTextBold } from './styled';
import { useTheme } from 'styled-components/native';

type TToastProps = {
  variant?: 'success' | 'error' | 'info';
  text1?: string;
  text2?: string;
};

export const Toast = (props: TToastProps) => {
  const { variant = 'info', text1, text2 } = props;
  const theme = useTheme();
  const bgColor = theme.colors[variant];

  return (
    <ToastContainer bgColor={bgColor}>
      <ToastTextBold>{text1}</ToastTextBold>
      {text2 && <ToastText>{text2}</ToastText>}
    </ToastContainer>
  );
};
