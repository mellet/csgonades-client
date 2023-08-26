import axios from "axios";
import { AppConfig } from "../../constants/Constants";
import { CsMap } from "../models/CsGoMap";
import {
  NadeStartLocation,
  NadeStartLocationCreate,
  NadeStartLocationUpdate,
} from "../models/NadeStartLocation";

export class MapLocationApi {
  public static async getMapStartLocation(csMap: CsMap) {
    const url = `${AppConfig.API_URL}/mapstartlocation/${csMap}`;
    const res = await axios.get<NadeStartLocation[]>(url);

    return res;
  }

  public static async addMapStartLocation(location: NadeStartLocationCreate) {
    const url = `${AppConfig.API_URL}/mapstartlocation/${location.map}`;

    const res = await axios.post<NadeStartLocation>(url, location);

    return res;
  }

  public static async updateNadeLocation(location: NadeStartLocationUpdate) {
    const url = `${AppConfig.API_URL}/mapstartlocation/${location.map}`;

    const res = await axios.put<NadeStartLocation>(url, location);
    return res;
  }

  public static async deleteMapStartLocation(location: NadeStartLocation) {
    const url = `${AppConfig.API_URL}/mapstartlocation/${location.map}/${location.id}`;

    const res = await axios.delete(url);

    return res;
  }
}
