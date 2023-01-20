import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { ButtonGroup } from "../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { SquareButton } from "../shared-components/buttons/IconButton/SquareButton";
import { FaCloud, FaStar } from "react-icons/fa";
import { ButtonWithIcon } from "../shared-components/buttons/ButtonWithIcon";

export default {
  title: "Button/Icon Button Group",
  component: ButtonGroup,
  args: {},
} as Meta;

const Template: Story = () => (
  <ButtonGroup vertical>
    <SquareButton icon={<FaStar />} active={false} />
    <SquareButton icon={<FaCloud />} active={true} />
    <SquareButton icon={<FaCloud />} active={false} />
  </ButtonGroup>
);

const TemplateWithTextButton: Story = () => (
  <ButtonGroup>
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
  </ButtonGroup>
);

export const Default = Template.bind({});

export const WithTextButton = TemplateWithTextButton.bind({});
