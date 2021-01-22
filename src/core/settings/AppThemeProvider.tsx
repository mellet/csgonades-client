import { FC } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useTheme } from "./SettingsHooks";
import { DEFAULT_THEME } from "./Themes";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Roboto", Helvetica, sans-serif !important;
    font-weight: 300;
    font-size: 16px;
  }

  input {
    font-family: "Roboto", sans-serif;
  }
`;

export const AppThemeProvider: FC = ({ children }) => {
  const { colors } = useTheme();

  const theme = {
    colors,
  };

  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export const StoryBookThemeProvider: FC = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={DEFAULT_THEME.theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
};
