import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { Report, ReportAddDto } from "../../models/Report";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export class ReportApi {
  static async getAll(token: string): AppResult<Report[]> {
    try {
      const res = await axios.get<Report[]>(`${Config.API_URL}/reports`, {
        headers: { Authorization: token },
      });
      const reports = res.data;

      return ok(reports);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async add(data: ReportAddDto): AppResult<Report> {
    try {
      const res = await axios.post<Report>(`${Config.API_URL}/reports`, data);

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async delete(id: string, token: string): AppResult<boolean> {
    try {
      await axios.delete(`${Config.API_URL}/reports/${id}`, {
        headers: { Authorization: token },
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
