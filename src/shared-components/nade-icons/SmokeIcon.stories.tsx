import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { SmokeIcon } from "./SmokeIcon";

export default {
  title: "Icon/Smoke Icon",
  component: SmokeIcon,
} as Meta;

const Template: Story = (args) => <SmokeIcon {...args} />;

export const Default = Template.bind({});

export const Smoke = Template.bind({});
