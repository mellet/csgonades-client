import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export type SiteStats = {
  ezoicEnabled: boolean;
  numNades: number;
  numPending: number;
  numUsers: number;
};

export class StatsApi {
  static async getStats(): AppResult<SiteStats> {
    try {
      const result = await axios.get<SiteStats>(`${Config.API_URL}/stats`);

      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
