import getConfig from "next/config";
import axios from "axios";
import { ok } from "neverthrow";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

const { config } = getConfig()?.publicRuntimeConfig;

export type NadeComment = {
  avatar: string;
  createdAt: Date;
  id: string;
  message: string;
  nadeId: string;
  nickname: string;
  steamId: string;
};

export type NadeCommentCreateDTO = {
  message: string;
  nadeId: string;
};

export type NadeCommentUpdateDTO = {
  id: string;
  message: string;
};

export class NadeCommentApi {
  static async getCommentsForNade(nadeId: string): AppResult<NadeComment[]> {
    try {
      const res = await axios.get<NadeComment[]>(
        `${config.apiUrl}/nades/${nadeId}/comments`
      );

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async createNadeComment(
    comment: NadeCommentCreateDTO,
    token: string
  ): AppResult<NadeComment> {
    try {
      const res = await axios.post<NadeComment>(
        `${config.apiUrl}/nades/${comment.nadeId}/comments`,
        comment,
        {
          headers: { Authorization: token },
        }
      );

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async updateNadeComment(
    nadeId: string,
    commentUpdate: NadeCommentUpdateDTO,
    token: string
  ): AppResult<NadeComment> {
    try {
      const res = await axios.patch<NadeComment>(
        `${config.apiUrl}/nades/${nadeId}/comments/${commentUpdate.id}`,
        commentUpdate,
        {
          headers: { Authorization: token },
        }
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async deleteNadeComment(
    nadeId: string,
    commentId: string,
    token: string
  ): AppResult<boolean> {
    try {
      await axios.delete(
        `${config.apiUrl}/nades/${nadeId}/comments/${commentId}`,
        {
          headers: { Authorization: token },
        }
      );
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
