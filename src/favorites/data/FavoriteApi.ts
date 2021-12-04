import { Config } from "../../constants/Constants";
import { Favorite } from "../models/Favorite";
import AxiosApi from "../../core/AxiosInstance";

export class FavoriteApi {
  static async getUserFavoritesV2(): Promise<Favorite[]> {
    const res = await AxiosApi.get<Favorite[]>(`${Config.API_URL}/favorites`);
    const favoritedNades = res.data;
    return favoritedNades;
  }
}
