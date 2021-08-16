import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    accent: string;
    hoverColor: string;
    disabledBg: string;
    errorColor: string;
    wrapperBg: string;
    darkModeBtn: string;
  }
}
