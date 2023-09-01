import { AppConfig } from "../../constants/Constants";
import { CsMap } from "../models/CsGoMap";
import {
  MapStartLocation,
  MapStartLocationCreate,
  MapStartLocationUpdate,
} from "../models/NadeStartLocation";
import AxiosApi from "../../core/AxiosInstance";
import { NadeType } from "../../nade/models/NadeType";
import {
  MapEndLocation,
  MapEndLocationCreate,
  MapEndLocationUpdate,
} from "../models/NadeEndLocation";
import { GameMode } from "../../nade/models/GameMode";

export class MapLocationApi {
  public static async getMapStartLocation(
    csMap: CsMap,
    gameMode: GameMode
  ): Promise<MapStartLocation[]> {
    const url = `${AppConfig.API_URL}/mapstartlocation/${csMap}?gameMode=${gameMode}`;
    const res = await AxiosApi.get<MapStartLocation[]>(url);

    return res.data;
  }

  public static async getMapEndLocation(
    csMap: CsMap,
    nadeType: NadeType,
    gameMode: GameMode
  ): Promise<MapEndLocation[]> {
    const url = `${AppConfig.API_URL}/mapendlocation/${csMap}/${nadeType}?gameMode=${gameMode}`;
    const res = await AxiosApi.get<MapEndLocation[]>(url);

    return res.data;
  }

  public static async addMapStartLocation(
    location: MapStartLocationCreate
  ): Promise<MapStartLocation> {
    const url = `${AppConfig.API_URL}/mapstartlocation/${location.map}`;

    const res = await AxiosApi.post<MapStartLocation>(url, location);

    return res.data;
  }

  public static async addMapEndLocation(
    location: MapEndLocationCreate
  ): Promise<MapStartLocation> {
    const url = `${AppConfig.API_URL}/mapendlocation/${location.map}`;

    const res = await AxiosApi.post<MapStartLocation>(url, location);

    return res.data;
  }

  public static async updateNadeLocation(
    location: MapStartLocationUpdate
  ): Promise<MapStartLocation> {
    const url = `${AppConfig.API_URL}/mapstartlocation/${location.map}`;
    const res = await AxiosApi.put<MapStartLocation>(url, location);

    return res.data;
  }

  public static async updateMapEndLocation(
    location: MapEndLocationUpdate
  ): Promise<MapEndLocation> {
    const url = `${AppConfig.API_URL}/mapendlocation/${location.map}`;

    const res = await AxiosApi.put<MapEndLocation>(url, location);

    return res.data;
  }

  public static async deleteMapStartLocation(location: MapStartLocation) {
    const url = `${AppConfig.API_URL}/mapstartlocation/${location.map}/${location.id}`;

    const res = await AxiosApi.delete(url);

    return res;
  }

  public static async deleteMapEndLocation(location: MapEndLocation) {
    const url = `${AppConfig.API_URL}/mapendlocation/${location.map}/${location.id}`;

    const res = await AxiosApi.delete(url);

    return res;
  }
}
