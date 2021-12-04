import { AuditDto } from "../models/AuditEvent";
import { Config } from "../../constants/Constants";
import AxiosApi from "../../core/AxiosInstance";

export class AuditApi {
  static async fetchAuditEvents(): Promise<AuditDto[]> {
    const response = await AxiosApi.get<AuditDto[]>(`${Config.API_URL}/audits`);

    return response.data;
  }
}
