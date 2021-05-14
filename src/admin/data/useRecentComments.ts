import useSWR from "swr";
import { NadeCommentApi } from "../../nade/data/NadeCommentApi";

async function fetcher() {
  try {
    const comments = await NadeCommentApi.getRecent();

    return comments;
  } catch (error) {
    throw error;
  }
}

export const useRecentComments = () => {
  const { data, isValidating } = useSWR("/comments/recent", fetcher);

  return {
    loading: !data && isValidating,
    comments: data || [],
  };
};
