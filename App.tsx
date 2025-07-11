import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import AppRoutes from './src/navigation';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}
