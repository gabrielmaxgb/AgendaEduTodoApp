import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      cardBackground: string;
      primary: string;
      secondary: string;
      text: string;
      textLight: string;
      border: string;
      error: string;
      success: string;
      warning: string;
      info: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
    fontSizes: {
      small: number;
      medium: number;
      large: number;
    };
  }
}
