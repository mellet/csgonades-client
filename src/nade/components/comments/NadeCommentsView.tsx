import { FC } from "react";
import { User } from "../../../users/models/User";
import { NadeComment, NadeCommentUpdateDTO } from "../../data/NadeCommentApi";
import { CommentSubmit } from "./CommentSubmit";
import { NadeCommentItem } from "./NadeCommentItem/NadeCommentItem";

export type NadeCommentsViewProps = {
  comments: NadeComment[];
  signedInUser?: Pick<User, "role" | "steamId">;
  onAddComment: (message: string) => void;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentUpdate: NadeCommentUpdateDTO) => void;
};

export const NadeCommentsView: FC<NadeCommentsViewProps> = ({
  onAddComment,
  comments,
  signedInUser,
  onDeleteComment,
  onEditComment,
}) => {
  return (
    <>
      <CommentSubmit
        onAddComment={onAddComment}
        isSignedIn={Boolean(signedInUser)}
      />

      {comments.map((nc) => (
        <NadeCommentItem
          key={nc.id}
          nadeComment={nc}
          signedInUser={signedInUser}
          onDeleteComment={onDeleteComment}
          onUpdateComment={onEditComment}
        />
      ))}
    </>
  );
};
