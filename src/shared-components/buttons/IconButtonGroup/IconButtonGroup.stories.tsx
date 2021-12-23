import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { IconButtonGroup } from "./IconButtonGroup";
import { SquareButton } from "../IconButton/IconButton";
import { FaCloud, FaStar } from "react-icons/fa";
import { ButtonWithIcon } from "../ButtonWithIcon";

export default {
  title: "Button/Icon Button Group",
  component: IconButtonGroup,
  args: {},
} as Meta;

const Template: Story = () => (
  <IconButtonGroup vertical>
    <SquareButton icon={<FaStar />} active={false} />
    <SquareButton icon={<FaCloud />} active={true} />
    <SquareButton icon={<FaCloud />} active={false} />
  </IconButtonGroup>
);

const TemplateWithTextButton: Story = () => (
  <IconButtonGroup>
    <ButtonWithIcon inGroup icon={<FaStar />} active={true} value="Button 1" />
    <ButtonWithIcon
      inGroup
      icon={<FaCloud />}
      active={false}
      value="Button 2"
    />
    <ButtonWithIcon
      inGroup
      icon={<FaCloud />}
      active={false}
      value="Button 3"
    />
  </IconButtonGroup>
);

export const Default = Template.bind({});

export const WithTextButton = TemplateWithTextButton.bind({});
