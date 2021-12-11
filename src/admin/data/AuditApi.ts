import { AuditDto } from "../models/AuditEvent";
import { AppConfig } from "../../constants/Constants";
import AxiosApi from "../../core/AxiosInstance";

export class AuditApi {
  static async fetchAuditEvents(): Promise<AuditDto[]> {
    const response = await AxiosApi.get<AuditDto[]>(
      `${AppConfig.API_URL}/audits`
    );

    return response.data;
  }
}
