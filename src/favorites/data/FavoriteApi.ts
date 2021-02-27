import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { Favorite } from "../models/Favorite";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";

export const getUserFavorites = async (
  token: string
): AppResult<Favorite[]> => {
  try {
    const res = await axios.get<Favorite[]>(`${Config.API_URL}/favorites`, {
      headers: { Authorization: token },
    });
    const favoritedNades = res.data;
    return ok(favoritedNades);
  } catch (error) {
    return extractApiError(error);
  }
};

export class FavoriteApi {
  static async getUserFavorites(token: string): AppResult<Favorite[]> {
    try {
      const res = await axios.get<Favorite[]>(`${Config.API_URL}/favorites`, {
        headers: { Authorization: token },
      });
      const favoritedNades = res.data;
      return ok(favoritedNades);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
