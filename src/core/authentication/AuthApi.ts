import axios, { AxiosRequestConfig } from "axios";
import { AppConfig } from "../../constants/Constants";

type TokenRes = {
  accessToken: string;
};

type SessionResponse = {
  authenticated: boolean;
};

type RefreshTokenResponse =
  | { authenticated: true; accessToken: string }
  | { authenticated: false };

export class AuthApi {
  static async refreshToken(cookie?: string): Promise<RefreshTokenResponse> {
    let config: AxiosRequestConfig = {
      withCredentials: true,
    };

    if (cookie) {
      config = {
        ...config,
        headers: {
          cookie: cookie,
        },
      };
    }

    const res = await axios.get<TokenRes>(
      `${AppConfig.API_URL}/auth/refresh`,
      config
    );

    if (res.status === 200) {
      return {
        authenticated: true,
        accessToken: res.data.accessToken,
      };
    } else {
      return {
        authenticated: false,
      };
    }
  }

  static async setSessionCookie(): Promise<SessionResponse> {
    const response = await axios.post<SessionResponse>(
      `${AppConfig.API_URL}/initSession`,
      {},
      { withCredentials: true }
    );

    return response.data;
  }

  static async signOut(): Promise<void> {
    try {
      await axios.post(
        `${AppConfig.API_URL}/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  }
}
