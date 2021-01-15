import axios from "axios";
import { ok } from "neverthrow";
import { AuditDto } from "../models/AuditEvent";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import { Config } from "../../constants/Constants";
import getConfig from "next/config";

const { config } = getConfig()?.publicRuntimeConfig;

export class AuditApi {
  static async fetchAuditEvents(token: string): AppResult<AuditDto[]> {
    try {
      const response = await axios.get<AuditDto[]>(`${config.apiUrl}/audits`, {
        headers: { Authorization: token },
      });

      return ok(response.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
