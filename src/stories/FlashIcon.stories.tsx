import React, { FC } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { NadeIcon, NadeIconProps } from "../shared-components/nade-icons";

const BoxContainer: FC = ({ children }) => {
  return (
    <>
      <div className="box-container">{children}</div>
      <style jsx>{`
        .box-container {
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
  title: "Icon/Flash Icon",
  component: NadeIcon,
} as Meta;

const Template: Story = (args) => (
  <BoxContainer>
    <NadeIcon {...args} />
  </BoxContainer>
);

export const Small = Template.bind({});

Small.args = {
  nadeType: "flash",
  size: 24,
  animated: true,
} as NadeIconProps;

export const SmallStatic = Template.bind({});

SmallStatic.args = {
  nadeType: "flash",
  size: 24,
  animated: false,
} as NadeIconProps;

export const MediumWithCount = Template.bind({});

MediumWithCount.args = {
  nadeType: "flash",
  size: 44,
  count: 2,
  animated: true,
} as NadeIconProps;

export const MediumWithCountAndLabel = Template.bind({});

MediumWithCountAndLabel.args = {
  nadeType: "flash",
  size: 44,
  count: 10,
  isNew: true,
  animated: true,
} as NadeIconProps;
