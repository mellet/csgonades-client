import { FC, useState, useEffect, useCallback, memo, useMemo } from "react";
import { NadeCommentApi, NadeComment } from "../../data/NadeCommentApi";
import { NadeCommentItem } from "./NadeCommentItem/NadeCommentItem";
import { CommentSubmit } from "./CommentSubmit";
import { Dimensions } from "../../../constants/Constants";
import { Nade } from "../../models/Nade";

type Props = {
  nade: Nade;
};

export const NadeComments: FC<Props> = memo(({ nade }) => {
  const { comments, addComment, fetchComments } = useNadeComments(nade);

  return (
    <>
      <div className="nade-comment-container">
        <div className="nade-submit">
          <CommentSubmit nadeId={nade.id} onCommentSubmitted={addComment} />
        </div>

        <div className="nade-comments">
          {comments.map((nc) => (
            <NadeCommentItem
              key={nc.id}
              nadeComment={nc}
              refetchComment={fetchComments}
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .nade-comment-container {
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        .nade-submit {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
});

const useNadeComments = (nade: Nade) => {
  const [rawComments, setRawComment] = useState<NadeComment[]>([]);

  const fetchComments = useCallback(() => {
    (async () => {
      if (nade.commentCount === 0) {
        return;
      }

      const res = await NadeCommentApi.getCommentsForNade(nade.id);
      if (res.isOk()) {
        setRawComment(res.value);
      }
    })();
  }, [nade.id, nade.commentCount]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = useCallback(
    (comment: NadeComment) => {
      setRawComment([comment, ...rawComments]);
    },
    [rawComments]
  );

  const comments = useMemo(() => {
    const copy = [...rawComments];
    copy.sort((a, b) => {
      const first = new Date(a.createdAt);
      const second = new Date(b.createdAt);
      return first > second ? -1 : first < second ? 1 : 0;
    });
    return copy;
  }, [rawComments]);

  return {
    comments,
    addComment,
    fetchComments,
  };
};
