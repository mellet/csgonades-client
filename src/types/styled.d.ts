import "styled-components";
import { ThemeColors } from "../core/settings/Themes";

interface IPalette {
  main: string;
  contrastText: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
  }
}
