import axios from "axios";
import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import { AddConctactDTO, ContactDTO } from "../models/ContactDTOs";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import AxiosApi from "../../core/AxiosInstance";

export class ContactApi {
  static async sendMessage(message: AddConctactDTO): AppResult<boolean> {
    try {
      await axios.post(`${AppConfig.API_URL}/contact`, message);
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async fetchContactMessages(): Promise<ContactDTO[]> {
    const response = await AxiosApi.get<ContactDTO[]>(
      `${AppConfig.API_URL}/contact`
    );

    return response.data;
  }
}
