import * as NextImage from "next/image";
import { CoreWrapperStory } from "../src/core/CoreWrapper";
import "semantic-ui-css/semantic.min.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <CoreWrapperStory>
      <Story />
    </CoreWrapperStory>
  ),
];

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
