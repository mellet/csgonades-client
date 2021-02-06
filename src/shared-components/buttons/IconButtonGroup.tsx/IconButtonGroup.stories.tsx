import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IconButtonGroup } from "./IconButtonGroup";
import { IconButton } from "../IconButton";
import { FaAdobe, FaCloud, FaStar } from "react-icons/fa";

export default {
  title: "Button/Icon Button Group",
  component: IconButtonGroup,
  args: {},
} as Meta;

const Template: Story = () => (
  <IconButtonGroup>
    <IconButton icon={<FaStar />} active={false} />
    <IconButton icon={<FaAdobe />} active={false} />
    <IconButton icon={<FaCloud />} active={true} />
  </IconButtonGroup>
);

export const Default = Template.bind({});
