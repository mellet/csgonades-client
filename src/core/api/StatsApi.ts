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

const config = getConfig()?.publicRuntimeConfig;

export class StatsApi {
  static async getStats(): AppResult<SiteStats> {
    try {
      const result = await axios.get<SiteStats>(`${config.apiUrl}/stats}`);

      return ok(result.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
