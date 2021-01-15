import axios from "axios";
import { ok } from "neverthrow";
import { AddConctactDTO, ContactDTO } from "./ContactDTOs";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import getConfig from "next/config";

const { config } = getConfig()?.publicRuntimeConfig;

export class ContactApi {
  static async sendMessage(message: AddConctactDTO): AppResult<boolean> {
    try {
      await axios.post(`${config.apiUrl}/contact`, message);
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async fetchContactMessages(token: string): AppResult<ContactDTO[]> {
    try {
      const response = await axios.get<ContactDTO[]>(
        `${config.apiUrl}/contact`,
        {
          headers: { Authorization: token },
        }
      );

      return ok(response.data);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
