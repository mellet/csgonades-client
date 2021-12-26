import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import {
  CsgnInput,
  CsgnInputProps,
} from "../shared-components/inputs/TextInput/CsgnInput";

export default {
  title: "Input/Text Input",
  component: CsgnInput,
  args: {
    label: "Text Input",
    placeholder: "Placeholder",
  } as CsgnInputProps,
} as Meta;

const Template: Story<CsgnInputProps> = (args) => <CsgnInput {...args} />;

export const Default = Template.bind({});

export const Required = Template.bind({});

Required.args = {
  required: true,
} as CsgnInputProps;
