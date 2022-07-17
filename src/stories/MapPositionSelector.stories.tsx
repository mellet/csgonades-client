import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  MapPositionSelector,
  MapPositionSelectorProps,
} from "../nade/components/MapPositionSelector/MapPositionSelector";

const GreyBackground: React.FC = ({ children }) => {
  return <div style={{ background: "#ccc", padding: 30 }}>{children}</div>;
};

export default {
  title: "Components/MapPositionSelector",
  component: MapPositionSelector,
  args: {
    map: "dust2",
  } as MapPositionSelectorProps,
} as Meta;

const Template: Story<MapPositionSelectorProps> = (args) => (
  <GreyBackground>
    <MapPositionSelector {...args} />
  </GreyBackground>
);

export const NormalUser = Template.bind({});

NormalUser.args = {} as MapPositionSelectorProps;
