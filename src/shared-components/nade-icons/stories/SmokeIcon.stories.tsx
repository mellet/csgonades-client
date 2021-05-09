import React, { FC } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { NadeIcon, NadeIconProps } from "..";

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
  title: "Icon/Smoke Icon",
  component: NadeIcon,
} as Meta;

const Template: Story = (args) => (
  <BoxContainer>
    <NadeIcon {...args} />
  </BoxContainer>
);

export const Small = Template.bind({});

Small.args = {
  nadeType: "smoke",
  size: 24,
  animated: true,
} as NadeIconProps;

export const MediumWithCount = Template.bind({});

MediumWithCount.args = {
  nadeType: "smoke",
  size: 44,
  count: 5,
  animated: true,
} as NadeIconProps;

export const MediumWithCountAndLabel = Template.bind({});

MediumWithCountAndLabel.args = {
  nadeType: "smoke",
  size: 44,
  count: 10,
  isNew: true,
  animated: true,
} as NadeIconProps;

export const MediumStatic = Template.bind({});

MediumStatic.args = {
  nadeType: "smoke",
  size: 44,
  animated: false,
} as NadeIconProps;
