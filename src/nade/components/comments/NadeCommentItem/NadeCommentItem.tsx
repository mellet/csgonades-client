import { FC } from "react";
import { NadeComment } from "../../../data/NadeCommentApi";
import { timeSince } from "../../../../utils/DateUtils";
import { useSignedInUser } from "../../../../core/authentication/useSignedInUser";
import Link from "next/link";
import { RenderMarkdown } from "../../RenderMarkdown";
import {
  NadeCommentActions,
  NadeCommentArrow,
  NadeCommentAvatar,
  NadeCommentBody,
  NadeCommentLayout,
  NadeCommentNickname,
  NadeCommentTime,
} from "./NadeCommentLayout";
import { NadeCommentActionButtons } from "./NadeCommentActions";

type Props = {
  nadeComment: NadeComment;
  refetchComment: () => void;
};

export const NadeCommentItem: FC<Props> = ({ nadeComment, refetchComment }) => {
  const allowEditAndDelete = useAllowEditComment(nadeComment);

  return (
    <>
      <NadeCommentLayout>
        <NadeCommentAvatar src={nadeComment.avatar} />
        <NadeCommentNickname>
          <Link href={`/users/${nadeComment.steamId}`}>
            <a>{nadeComment.nickname}</a>
          </Link>
          <NadeCommentArrow />
        </NadeCommentNickname>
        <NadeCommentBody>
          <RenderMarkdown value={nadeComment.message} />
        </NadeCommentBody>
        <NadeCommentTime>
          {timeSince(nadeComment.createdAt)} ago
        </NadeCommentTime>
        <NadeCommentActions>
          {allowEditAndDelete && (
            <NadeCommentActionButtons
              nadeComment={nadeComment}
              refetchComment={refetchComment}
            />
          )}
        </NadeCommentActions>
      </NadeCommentLayout>
    </>
  );
};

const useAllowEditComment = (nadeComment: NadeComment) => {
  const user = useSignedInUser();

  if (!user) {
    return false;
  }

  if (user.role === "administrator" || user.role === "moderator") {
    return true;
  }

  if (user.steamId === nadeComment.steamId) {
    return true;
  }

  return false;
};
