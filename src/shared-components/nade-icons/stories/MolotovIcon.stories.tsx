import React, { FC } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { NadeIconProps } from "../shared/NadeIconProps";
import { MolotovIcon } from "../MolotovIcon";

const BoxContainer: FC = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          display: inline-block;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 10px;
        }
      `}</style>
    </>
  );
};

export default {
  title: "Icon/Molotov Icon",
  component: MolotovIcon,
} as Meta;

const Template: Story = (args) => (
  <BoxContainer>
    <MolotovIcon {...args} />
  </BoxContainer>
);

export const Small = Template.bind({});

Small.args = {
  size: 24,
} as NadeIconProps;

export const MediumWithCount = Template.bind({});

MediumWithCount.args = {
  size: 44,
  count: 2,
} as NadeIconProps;

export const MediumWithCountAndLabel = Template.bind({});

MediumWithCountAndLabel.args = {
  size: 44,
  count: 10,
  isNew: true,
} as NadeIconProps;
