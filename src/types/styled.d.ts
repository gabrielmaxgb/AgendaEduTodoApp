import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      text: string;
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
