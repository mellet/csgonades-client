import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import AxiosApi from "../../core/AxiosInstance";
import { Role } from "../../users/models/User";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export type NadeComment = {
  avatar: string;
  createdAt: Date;
  id: string;
  message: string;
  nadeId: string;
  nickname: string;
  steamId: string;
  role?: Role;
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
  static async getCommentsForNade(nadeId: string): Promise<NadeComment[]> {
    const res = await AxiosApi.get<NadeComment[]>(
      `${AppConfig.API_URL}/nades/${nadeId}/comments`
    );

    return res.data;
  }

  static async getRecent(): Promise<NadeComment[]> {
    const res = await AxiosApi.get<NadeComment[]>(
      `${AppConfig.API_URL}/comments/recent`
    );

    return res.data;
  }

  static async createNadeComment(
    comment: NadeCommentCreateDTO
  ): AppResult<NadeComment> {
    try {
      const res = await AxiosApi.post<NadeComment>(
        `${AppConfig.API_URL}/nades/${comment.nadeId}/comments`,
        comment
      );

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async updateNadeComment(
    nadeId: string,
    commentUpdate: NadeCommentUpdateDTO
  ): AppResult<NadeComment> {
    try {
      const res = await AxiosApi.patch<NadeComment>(
        `${AppConfig.API_URL}/nades/${nadeId}/comments/${commentUpdate.id}`,
        commentUpdate
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async deleteNadeComment(
    nadeId: string,
    commentId: string
  ): AppResult<boolean> {
    try {
      await AxiosApi.delete(
        `${AppConfig.API_URL}/nades/${nadeId}/comments/${commentId}`
      );
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
