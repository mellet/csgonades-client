import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { NadeCommentsViewProps, NadeCommentsView } from "./NadeCommentsView";
import { NadeComment } from "../../data/NadeCommentApi";

const mockedNadeId = "nadeId";

const mockedComments: NadeComment[] = [
  {
    id: "commentId1",
    avatar:
      "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/32/32baf9abf6583e41d79174e2ebe284399c00ac23_medium.jpg",
    createdAt: new Date(),
    message: "Hello World",
    nadeId: mockedNadeId,
    nickname: "sNipn",
    steamId: "adminSteamId",
    role: "administrator",
  },
  {
    id: "commentId2",
    avatar:
      "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/32/32baf9abf6583e41d79174e2ebe284399c00ac23_medium.jpg",
    createdAt: new Date(),
    message: "Test comment",
    nadeId: mockedNadeId,
    nickname: "GenericUser",
    steamId: "genericUserId",
    role: "user",
  },
];

export default {
  title: "NadeComments/CommentsView",
  component: NadeCommentsView,
  args: {
    comments: mockedComments,
  } as NadeCommentsViewProps,
} as Meta;

const Template: Story<NadeCommentsViewProps> = (args) => (
  <NadeCommentsView {...args} />
);

export const AsNotSignedIn = Template.bind({});

export const AsGenericUser = Template.bind({});

AsGenericUser.args = {
  signedInUser: {
    role: "user",
    steamId: "genericUserId",
  },
} as NadeCommentsViewProps;

export const AsModerator = Template.bind({});

AsModerator.args = {
  signedInUser: {
    role: "moderator",
    steamId: "moderatorSteamId",
  },
} as NadeCommentsViewProps;
