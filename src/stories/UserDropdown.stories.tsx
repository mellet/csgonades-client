import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  UserDropdownView,
  UserDropdownViewProps,
} from "../core/layout/defaultheader/components/UserDropdown/UserDropdownView";

export default {
  title: "Header/UserDropdown",
  component: UserDropdownView,
  args: {
    avatar:
      "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/32/32baf9abf6583e41d79174e2ebe284399c00ac23_medium.jpg",
    nickname: "Nickname",
    role: "user",
  } as UserDropdownViewProps,
} as Meta;

const Template: Story<UserDropdownViewProps> = (args) => (
  <UserDropdownView {...args} />
);

export const NormalUser = Template.bind({});

NormalUser.args = {} as UserDropdownViewProps;
