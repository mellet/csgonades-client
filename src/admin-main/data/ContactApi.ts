import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { AddConctactDTO, ContactDTO } from "./ContactDTOs";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export class ContactApi {
  static async sendMessage(message: AddConctactDTO): AppResult<boolean> {
    try {
      await axios.post(`${Config.API_URL}/contact`, message);
      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async fetchContactMessages(token: string): AppResult<ContactDTO[]> {
    try {
      const response = await axios.get<ContactDTO[]>(
        `${Config.API_URL}/contact`,
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
