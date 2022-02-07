import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import { Notification } from "../models/Notification";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import AxiosApi from "../../core/AxiosInstance";
import { dateFromStringOrDate } from "../../utils/DateUtils";

export class NotificationApi {
  static async getNotifications(): AppResult<Notification[]> {
    try {
      const res = await AxiosApi.get<Notification[]>(
        `${AppConfig.API_URL}/notifications`
      );

      const datify = res.data.map((noti) => ({
        ...noti,
        createdAt: dateFromStringOrDate(noti.createdAt),
      }));

      return ok(datify);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async markAllAsViewed(): Promise<void> {
    try {
      await AxiosApi.patch(`${AppConfig.API_URL}/notifications/viewed`, {});
    } catch (error) {
      // TODO
    }
  }
}
