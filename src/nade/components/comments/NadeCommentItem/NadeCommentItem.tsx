import { FC } from "react";
import {
  NadeComment,
  NadeCommentUpdateDTO,
} from "../../../data/NadeCommentApi";
import { timeSince } from "../../../../utils/DateUtils";
import Link from "next/link";
import { RenderMarkdown } from "../../RenderMarkdown";
import { NadeCommentLayout } from "./NadeCommentLayout";
import { NadeCommentActionButtons } from "./NadeCommentActionButtons";
import { RoleLabel } from "../../../../users/components/RoleLabel";
import { User } from "../../../../users/models/User";
import { NadeCommentAvatar } from "./NadeCommentAvatar";
import { NadeCommentNickname } from "./NadeCommentNickname";
import { NadeCommentBody } from "./NadeCommentBody";
import { NadeCommentTime } from "./NadeCommentTime";
import { NadeCommentActions } from "./NadeCommentActions";
import { NadeCommentArrow } from "./NadeCommentArrow";

export type NadeCommentItemProps = {
  nadeComment: NadeComment;
  signedInUser?: Pick<User, "role" | "steamId">;
  onUpdateComment: (commentUpdate: NadeCommentUpdateDTO) => void;
  onDeleteComment: (commentId: string) => void;
};

export const NadeCommentItem: FC<NadeCommentItemProps> = ({
  nadeComment,
  signedInUser,
  onUpdateComment,
  onDeleteComment,
}) => {
  const allowEditAndDelete = isAllowedToEditComment(nadeComment, signedInUser);

  const showRoleLabel = nadeComment.role !== "user";

  return (
    <>
      <NadeCommentLayout>
        <NadeCommentAvatar user={nadeComment} />
        <NadeCommentNickname>
          <Link href={`/users/${nadeComment.steamId}`} passHref>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <a className="nickname">{nadeComment.nickname}</a>
              {nadeComment.role && showRoleLabel && (
                <RoleLabel role={nadeComment.role} />
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
              onDeleteComment={onDeleteComment}
              onUpdateComment={onUpdateComment}
            />
          )}
        </NadeCommentActions>
      </NadeCommentLayout>
      <style jsx>{`
        .nickname:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

const isAllowedToEditComment = (
  nadeComment: NadeComment,
  signedInUser?: Pick<User, "role" | "steamId">
) => {
  if (!signedInUser) {
    return false;
  }

  if (
    signedInUser.role === "administrator" ||
    signedInUser.role === "moderator"
  ) {
    return true;
  }

  if (signedInUser.steamId === nadeComment.steamId) {
    return true;
  }

  return false;
};
