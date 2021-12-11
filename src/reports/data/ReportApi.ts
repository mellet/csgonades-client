import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import { Report, ReportAddDto } from "../models/Report";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import AxiosApi from "../../core/AxiosInstance";

export class ReportApi {
  static async getAll(): Promise<Report[]> {
    const res = await AxiosApi.get<Report[]>(`${AppConfig.API_URL}/reports`);
    const reports = res.data;

    return reports;
  }

  static async add(data: ReportAddDto): AppResult<Report> {
    try {
      const res = await AxiosApi.post<Report>(
        `${AppConfig.API_URL}/reports`,
        data
      );

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async delete(id: string): AppResult<boolean> {
    try {
      await AxiosApi.delete(`${AppConfig.API_URL}/reports/${id}`);
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
