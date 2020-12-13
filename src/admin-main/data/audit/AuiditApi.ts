import axios from "axios";
import { ok } from "neverthrow";
import { AuditDto } from "./AuditEvent";
import { AppResult, extractApiError } from "../../../utils/ErrorUtil";
import { Config } from "../../../constants/Constants";

export class AuditApi {
  static async fetchAuditEvents(token: string): AppResult<AuditDto[]> {
    try {
      const response = await axios.get<AuditDto[]>(`${Config.API_URL}/audits`, {
        headers: { Authorization: token },
      });

      return ok(response.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
