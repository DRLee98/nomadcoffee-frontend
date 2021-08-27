import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends CommonTheme {
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

export interface CommonTheme {
  maxWidth: string;
  BtnTextColor: string;
  greenBtnColor: string;
  redBtnColor: string;
  grayColor: string;
}
