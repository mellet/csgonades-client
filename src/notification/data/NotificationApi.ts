import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { Notification } from "../models/Notification";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export class NotificationApi {
  static async getNotifications(token: string): AppResult<Notification[]> {
    try {
      const res = await axios.get<Notification[]>(
        `${Config.API_URL}/notifications`,
        {
          headers: { Authorization: token },
        }
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async markAllAsViewed(token: string): Promise<void> {
    try {
      await axios.patch(
        `${Config.API_URL}/notifications/viewed`,
        {},
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
