import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  SquareButton,
  IconButtonProps,
} from "../shared-components/buttons/IconButton/IconButton";
import { FaStar } from "react-icons/fa";

export default {
  title: "Button/Icon Button",
  component: SquareButton,
  args: {
    icon: <FaStar />,
  } as IconButtonProps,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <SquareButton {...args} />;

export const Default = Template.bind({});

export const WithCustomColor = Template.bind({});

WithCustomColor.args = {
  icon: <FaStar />,
  activeColor: "orange",
} as IconButtonProps;

export const WithLabel = Template.bind({});

WithLabel.args = {
  icon: <FaStar />,
  activeColor: "orange",
  labelCount: 69,
} as IconButtonProps;
