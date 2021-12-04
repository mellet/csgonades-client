import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { Notification } from "../models/Notification";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import AxiosApi from "../../core/AxiosInstance";

export class NotificationApi {
  static async getNotifications(): AppResult<Notification[]> {
    try {
      const res = await AxiosApi.get<Notification[]>(
        `${Config.API_URL}/notifications`
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async markAllAsViewed(): Promise<void> {
    try {
      await AxiosApi.patch(`${Config.API_URL}/notifications/viewed`, {});
    } catch (error) {
      // TODO
    }
  }
}
