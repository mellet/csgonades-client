import { FC } from "react";
import { AdminCommentItem } from "../components/AdminCommentItem";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { useRecentComments } from "../data/hooks/useRecentComments";

export const AdminCommentContainer: FC = () => {
  const { comments } = useRecentComments();

  return (
    <>
      <div className="recent-comments">
        <AdminPageTitle
          title="Recent comments"
          description="Recently added comments."
        />

        {comments.map((c) => (
          <AdminCommentItem key={c.id} comment={c} />
        ))}
      </div>
    </>
  );
};
