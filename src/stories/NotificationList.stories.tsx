import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  NotificationList,
  NotificationListProps,
} from "../notification/container/NotificationList";
import { Notification } from "../notification/models/Notification";

export default {
  title: "Notification/List",
  component: NotificationList,
  args: {} as NotificationListProps,
} as Meta;

const Template: Story<NotificationListProps> = (args) => (
  <NotificationList {...args} />
);

export const List = Template.bind({});

const defaultValues = {
  createdAt: new Date(),
  nadeId: "123",
  id: "123",
  nadeSlug: "mirage-connector-smoke-6",
  viewed: false,
  thumnailUrl:
    "https://storage.googleapis.com/csgonades-3308a.appspot.com/nades/w12PpFwT91S63nrFPtxMM_thumb.jpg",
};

const notifications: Notification[] = [
  {
    type: "contact-msg",
    createdAt: new Date(),
    id: "123",
    subjectSteamId: "123",
    viewed: false,
  },
  {
    type: "favorite-agregate",
    byNickname: "sNipn",
    count: 5,
    ...defaultValues,
  },
  {
    type: "new-comment",
    byNickname: "Frank",
    bySteamId: "123",
    createdAt: new Date(),
    id: "123",
    nadeId: "123",
    subjectSteamId: "123",
    viewed: false,
    thumnailUrl: defaultValues.thumnailUrl,
  },
  {
    type: "accepted-nade",
    ...defaultValues,
    subjectSteamId: "",
  },
  {
    type: "declined-nade",
    ...defaultValues,
    subjectSteamId: "",
  },
  {
    ...defaultValues,
    type: "report",
    subjectSteamId: "",
  },
  {
    ...defaultValues,
    type: "new-nade",
    subjectSteamId: "",
  },
];

List.args = {
  notifications,
} as NotificationListProps;
