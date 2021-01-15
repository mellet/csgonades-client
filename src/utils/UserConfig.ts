import { User } from "../users/models/User";

type UserLocalConfig = {
  user?: User;
  token?: string;
  userFavorites: string[];
  acceptedCookieConsent: boolean;
  darkModeEnabled: boolean;
};

const defaultConfig: UserLocalConfig = {
  userFavorites: [],
  acceptedCookieConsent: false,
  darkModeEnabled: false,
};

const USER_CONFIG_KEY = "cgnv1-userconfig";

export class UserConfig {
  static get(): UserLocalConfig {
    const userConfig = localStorage.getItem(USER_CONFIG_KEY);
    if (!userConfig) {
      return defaultConfig;
    }
    return JSON.parse(userConfig);
  }

  static set(config: UserLocalConfig) {
    localStorage.setItem(USER_CONFIG_KEY, JSON.stringify(config));
  }
}
