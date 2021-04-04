import React, { FC } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { SmokeIcon } from "./SmokeIcon";

const BoxContainer: FC = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          width: 200px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 1em;
        }
      `}</style>
    </>
  );
};

export default {
  title: "Icon/Smoke Icon",
  component: SmokeIcon,
} as Meta;

const Template: Story = (args) => (
  <BoxContainer>
    <SmokeIcon {...args} />
  </BoxContainer>
);

export const Default = Template.bind({});

export const Smoke = Template.bind({});
