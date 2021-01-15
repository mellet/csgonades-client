import getConfig from "next/config";
import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { Report, ReportAddDto } from "../models/Report";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

const { config } = getConfig();

export class ReportApi {
  static async getAll(token: string): AppResult<Report[]> {
    try {
      const res = await axios.get<Report[]>(`${config.apiUrl}/reports`, {
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
      const res = await axios.post<Report>(`${config.apiUrl}/reports`, data);

      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async delete(id: string, token: string): AppResult<boolean> {
    try {
      await axios.delete(`${config.apiUrl}/reports/${id}`, {
        headers: { Authorization: token },
      });
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
