import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './src/navigation';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme/theme';
import Toast from 'react-native-toast-message';
import { Toast as CustomToast } from './src/components/common/customToasts/CustomToasts';
import type { BaseToastProps } from 'react-native-toast-message';
import * as Sentry from '@sentry/react-native';
// import Button from './src/components/common/button/Button';

Sentry.init({
  dsn: 'https://dfc1a10ade18e4d9ee18930c09180406@o4509671371440128.ingest.us.sentry.io/4509671379304448',
});

Sentry.captureException(new Error('Erro de teste!'));

const successToast = (props: BaseToastProps) => (
  <CustomToast {...props} variant="success" />
);
const errorToast = (props: BaseToastProps) => (
  <CustomToast {...props} variant="error" />
);
const infoToast = (props: BaseToastProps) => (
  <CustomToast {...props} variant="info" />
);

const queryClient = new QueryClient();

export default Sentry.wrap(function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        {/* <Button title='Try Sentry' onPress={ () => { Sentry.captureException(new Error('New error')) }}/> */}
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
});
