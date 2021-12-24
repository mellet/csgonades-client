import { FC, memo } from "react";
import { Nade } from "../../models/Nade";
import { NadeCommentsView } from "./NadeCommentsView";
import { useSignedInUser } from "../../../core/authentication/useSignedInUser";
import { useNadeComments } from "./data/useNadeComments";

type Props = {
  nade: Nade;
};

export const NadeComments: FC<Props> = memo(({ nade }) => {
  const { comments, onAddComment, onEditComment, onDeleteComment } =
    useNadeComments(nade.id);
  const { signedInUser } = useSignedInUser();

  return (
    <NadeCommentsView
      comments={comments}
      signedInUser={signedInUser}
      onDeleteComment={onDeleteComment}
      onEditComment={onEditComment}
      onAddComment={onAddComment}
    />
  );
});
