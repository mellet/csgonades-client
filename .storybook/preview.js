import { StoryBookThemeProvider } from "../src/core/settings/AppThemeProvider";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <StoryBookThemeProvider>
      <Story />
    </StoryBookThemeProvider>
  ),
];
