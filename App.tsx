import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './src/navigation';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme/theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
