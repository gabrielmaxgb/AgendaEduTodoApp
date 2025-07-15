import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './src/navigation';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme/theme';
import Toast from 'react-native-toast-message';
import { Toast as CustomToast } from './src/components/common/customToasts/CustomToasts';
import type { BaseToastProps } from 'react-native-toast-message';

const successToast = (props: BaseToastProps) => <CustomToast {...props} variant="success" />;
const errorToast = (props: BaseToastProps) => <CustomToast {...props} variant="error" />;
const infoToast = (props: BaseToastProps) => <CustomToast {...props} variant="info" />;

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <Toast
          config={{
            success: successToast,
            error: errorToast,
            info: infoToast,
          }}
          />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
