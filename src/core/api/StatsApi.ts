import axios from "axios";
import { ok } from "neverthrow";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import getConfig from "next/config";

export type SiteStats = {
  ezoicEnabled: boolean;
  numNades: number;
  numPending: number;
  numUsers: number;
};

const { config } = getConfig();

export class StatsApi {
  static async getStats(): AppResult<SiteStats> {
    try {
      const result = await axios.get<SiteStats>(`${config.apiUrl}/${config.statsPath}`);

      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
