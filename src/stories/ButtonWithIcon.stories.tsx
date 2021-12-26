import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  ButtonWithIcon,
  ButtonWithIconProps,
} from "../shared-components/buttons/ButtonWithIcon";
import { FaStar } from "react-icons/fa";

export default {
  title: "Button/WithIconAndText",
  component: ButtonWithIcon,
  args: {
    icon: <FaStar />,
    value: "Test",
  } as ButtonWithIconProps,
} as Meta;

const Template: Story<ButtonWithIconProps> = (args) => (
  <ButtonWithIcon {...args} />
);

export const Default = Template.bind({});

export const WithCustomColor = Template.bind({});

WithCustomColor.args = {
  value: "Test",
} as ButtonWithIconProps;
