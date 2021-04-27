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
import { RoleLabel } from "../../../../users/components/RoleLabel";

export type NadeCommentItemProps = {
  nadeComment: NadeComment;
  onRefetchComment: () => void;
};

export const NadeCommentItem: FC<NadeCommentItemProps> = ({
  nadeComment,
  onRefetchComment: refetchComment,
}) => {
  const allowEditAndDelete = useAllowEditComment(nadeComment);

  const showRoleLabel = nadeComment.role !== "user";

  return (
    <>
      <NadeCommentLayout>
        <NadeCommentAvatar src={nadeComment.avatar} />
        <NadeCommentNickname>
          <Link href={`/users/${nadeComment.steamId}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <a>{nadeComment.nickname}</a>
              {nadeComment.role && showRoleLabel && (
                <RoleLabel role="administrator" />
              )}
            </div>
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
