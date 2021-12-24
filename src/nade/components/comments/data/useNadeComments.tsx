import { useCallback, useMemo } from "react";
import {
  NadeCommentApi,
  NadeComment,
  NadeCommentUpdateDTO,
} from "../../../data/NadeCommentApi";
import { useSignedInUser } from "../../../../core/authentication/useSignedInUser";
import useSWR from "swr";

async function fetchComments(_url: string, nadeId: string) {
  const res = await NadeCommentApi.getCommentsForNade(nadeId);
  return res;
}

export const useNadeComments = (nadeId: string) => {
  const { signedInUser } = useSignedInUser();
  const { data, mutate, isValidating } = useSWR(
    ["comments", nadeId],
    fetchComments
  );

  const onAddComment = useCallback(
    async (message: string) => {
      if (!signedInUser) {
        return;
      }

      const comment: NadeComment = {
        avatar: signedInUser.avatar,
        createdAt: new Date(),
        id: "tempId",
        message,
        nadeId,
        nickname: signedInUser.nickname,
        steamId: signedInUser.steamId,
        role: signedInUser.role,
      };

      mutate((prevComments) => {
        if (!prevComments) {
          return [comment];
        } else {
          return [comment, ...prevComments];
        }
      }, false);
      await NadeCommentApi.createNadeComment(comment);
      mutate();
    },
    [mutate, signedInUser, nadeId]
  );

  const onEditComment = useCallback(
    async (commentUpdate: NadeCommentUpdateDTO) => {
      if (!signedInUser) {
        return;
      }

      mutate((prevComments) => {
        if (!prevComments) {
          return undefined;
        }
        return prevComments.map((comment) => {
          if (comment.id === commentUpdate.id) {
            return { ...comment, message: commentUpdate.message };
          } else {
            return comment;
          }
        }, false);
      }, false);
      await NadeCommentApi.updateNadeComment(nadeId, commentUpdate);
      mutate();
    },
    [mutate, nadeId, signedInUser]
  );

  const onDeleteComment = useCallback(
    async (commentId: string) => {
      if (!signedInUser) {
        return;
      }
      mutate((prevData) => {
        if (!prevData) {
          return undefined;
        } else {
          return prevData.filter((nc) => nc.id !== commentId);
        }
      }, false);
      await NadeCommentApi.deleteNadeComment(nadeId, commentId);
      mutate();
    },
    [mutate, nadeId, signedInUser]
  );

  const sortedComments = useMemo(() => {
    if (!data) {
      return [];
    }
    const copy = [...data];
    copy.sort((a, b) => {
      const first = new Date(a.createdAt);
      const second = new Date(b.createdAt);
      return first > second ? -1 : first < second ? 1 : 0;
    });
    return copy;
  }, [data]);

  return {
    isLoadingComments: isValidating && !data,
    comments: sortedComments,
    onAddComment,
    onEditComment,
    onDeleteComment,
  };
};
