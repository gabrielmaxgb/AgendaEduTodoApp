import Toast from 'react-native-toast-message';

export interface IToastParams {
  type: 'success' | 'error' | 'info';
  text1: string;
  text2?: string;
}

export const useToast = () => {
  const showToast = (params: IToastParams) => {
    const { type, text1, text2 } = params;

    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  return { showToast };
};
