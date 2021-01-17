import axios from "axios";
import { ok } from "neverthrow";
import { Notification } from "../models/Notification";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import getConfig from "next/config";

const config = getConfig()?.publicRuntimeConfig;

export class NotificationApi {
  static async getNotifications(token: string): AppResult<Notification[]> {
    try {
      const res = await axios.get<Notification[]>(
        `${config.apiUrl}/notifications`,
        {
          headers: { Authorization: token },
        }
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async markAsViewed(id: string, token: string): Promise<void> {
    try {
      await axios.patch(
        `${config.apiUrl}/notifications/${id}/viewed`,
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
