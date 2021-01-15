import axios, { AxiosRequestConfig } from "axios";
import { ok } from "neverthrow";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import getConfig from "next/config";

const config = getConfig()?.publicRuntimeConfig;

type TokenRes = {
  accessToken: string;
};

export class AuthApi {
  static async refreshToken(cookie?: string): AppResult<string> {
    try {
      let requestConfig: AxiosRequestConfig = {
        withCredentials: true,
      };

      if (cookie) {
        requestConfig = {
          ...config,
          headers: {
            cookie: cookie,
          },
        };
      }

      const res = await axios.get<TokenRes>(
        `${config.apiUrl}/auth/refresh`,
        requestConfig
      );

      return ok(res.data.accessToken);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async setSessionCookie(): Promise<void> {
    await axios.post(
      `${config.apiUrl}/initSession`,
      {},
      { withCredentials: true }
    );
  }

  static async signOut(): Promise<void> {
    try {
      await axios.post(
        `${config.apiUrl}/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
