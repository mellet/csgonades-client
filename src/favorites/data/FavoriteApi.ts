import { AppConfig } from "../../constants/Constants";
import { Favorite } from "../models/Favorite";
import AxiosApi from "../../core/AxiosInstance";
import { startMeasurement, endMeasurement } from "../../utils/Instrumentation";

export class FavoriteApi {
  static async getUserFavoritesV2(): Promise<Favorite[]> {
    const start = startMeasurement("getUserFavoritesV2", "FavoriteApi");
    const res = await AxiosApi.get<Favorite[]>(
      `${AppConfig.API_URL}/favorites`
    );
    const favoritedNades = res.data;

    endMeasurement(start);

    return favoritedNades;
  }
}
