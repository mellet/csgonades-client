import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IconButtonGroup } from "./IconButtonGroup";
import { SquareButton } from "../IconButton";
import { FaCloud, FaStar } from "react-icons/fa";

export default {
  title: "Button/Icon Button Group",
  component: IconButtonGroup,
  args: {},
} as Meta;

const Template: Story = () => (
  <IconButtonGroup>
    <SquareButton icon={<FaStar />} active={false} />
    <SquareButton icon={<FaCloud />} active={true} />
  </IconButtonGroup>
);

export const Default = Template.bind({});
