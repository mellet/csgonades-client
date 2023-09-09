import axios from "axios";
import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import { CsMap } from "../../map/models/CsGoMap";
import { Nade, NadeSchema } from "../models/Nade";
import { NadeUpdateBody } from "../models/NadeUpdateBody";
import { NadeCreateBody } from "../models/NadeCreateBody";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import { Favorite } from "../../favorites/models/Favorite";
import AxiosApi from "../../core/AxiosInstance";
import { NadeType } from "../models/NadeType";
import { GameMode } from "../models/GameMode";
import { MapNadeLocations } from "../../map/models/MapNadeLocations";
import { Tickrate } from "../models/NadeTickrate";
import { TeamSide } from "../models/TeamSide";
import { UserLight } from "../../users/models/User";
import { NadeLight, nadeLightSchema } from "../models/NadePartial";

type NadeEloGame = {
  nadeOneId: string;
  nadeTwoId: string;
  winnerId: string;
};

export class NadeApi {
  static async getMapContributors(map: CsMap, gameMode: GameMode) {
    const urlBuilder = new URL(`/nades/contributors/${map}`, AppConfig.API_URL);
    urlBuilder.searchParams.append("gameMode", gameMode);
    const url = urlBuilder.toString();

    const res = await axios.get<UserLight[]>(url);

    return res;
  }

  static async favoriteNade(nadeId: string): AppResult<Favorite> {
    try {
      const res = await AxiosApi.post<Favorite>(
        `${AppConfig.API_URL}/nades/${nadeId}/favorite`,
        undefined
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async unFavoriteNade(nadeId: string): Promise<boolean> {
    try {
      await AxiosApi.delete<Favorite>(
        `${AppConfig.API_URL}/nades/${nadeId}/favorite`
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getRecent(gameMode: GameMode): Promise<NadeLight[]> {
    const url = `${AppConfig.API_URL}/nades?gameMode=${gameMode}`;
    const res = await axios.get(url);

    return parseAndFilterNadeLight(res.data);
  }

  static async getPending(): Promise<NadeLight[]> {
    const res = await AxiosApi.get(`${AppConfig.API_URL}/nades/pending`);
    return parseAndFilterNadeLight(res.data);
  }

  static async getDeclined(): Promise<NadeLight[]> {
    const res = await AxiosApi.get(`${AppConfig.API_URL}/nades/declined`);
    return parseAndFilterNadeLight(res.data);
  }

  static async getDeleted(): Promise<NadeLight[]> {
    const res = await AxiosApi.get(`${AppConfig.API_URL}/nades/deleted`);

    return parseAndFilterNadeLight(res.data);
  }

  static async getByMap(
    mapName: CsMap,
    gameMode: GameMode,
    nadeType?: NadeType
  ): Promise<NadeLight[]> {
    const url = new URL(`/nades/map/${mapName}`, AppConfig.API_URL);
    url.searchParams.append("gameMode", gameMode);
    nadeType && url.searchParams.append("type", nadeType);

    const res = await axios.get<NadeLight[]>(url.toString());
    const nades = parseAndFilterNadeLight(res.data);

    return nades;
  }

  static async getMapNadeLocations(
    mapName: CsMap,
    gameMode: GameMode,
    nadeType: NadeType,
    tickRate: Tickrate,
    teamSide: TeamSide,
    byFavorites: boolean
  ): Promise<MapNadeLocations[]> {
    const url = new URL(`/nademap/${mapName}`, AppConfig.API_URL);
    url.searchParams.set("nadeType", nadeType);
    url.searchParams.set("gameMode", gameMode);
    tickRate && url.searchParams.set("tickRate", tickRate);
    url.searchParams.set("teamSide", teamSide);
    url.searchParams.set("favorites", byFavorites ? "1" : "0");

    const res = await AxiosApi.get<MapNadeLocations[]>(url.toString());

    return res.data;
  }

  static async getByStartAndEndLocation(
    startLocationId: string,
    endLocationId: string
  ): Promise<NadeLight[]> {
    const url = `${AppConfig.API_URL}/nades/start/${startLocationId}/end/${endLocationId}`;
    const res = await axios.get<NadeLight[]>(url);

    const nades = parseAndFilterNadeLight(res.data);

    return nades;
  }

  static async byId(id: string): Promise<Nade> {
    const res = await axios.get(`${AppConfig.API_URL}/nades/${id}`, {
      withCredentials: true,
    });

    const nade = NadeSchema.parse(res.data);

    return nade;
  }

  static async byUser(
    steamId: string,
    gameMode: GameMode,
    csgoMap: CsMap
  ): AppResult<NadeLight[]> {
    try {
      const url = new URL(`/nades/user/${steamId}`, AppConfig.API_URL);
      url.searchParams.append("gameMode", gameMode);

      if (csgoMap) {
        url.searchParams.append("map", csgoMap);
      }

      const res = await axios.get(url.toString());
      const nades = res.data as NadeLight[];
      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async save(nadeBody: NadeCreateBody): AppResult<Nade> {
    try {
      const res = await AxiosApi.post(`${AppConfig.API_URL}/nades`, nadeBody);
      const nade = res.data as Nade;
      return ok(nade);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async update(
    nadeId: string,
    updateFields: NadeUpdateBody
  ): AppResult<Nade> {
    try {
      const res = await AxiosApi.put(
        `${AppConfig.API_URL}/nades/${nadeId}`,
        updateFields
      );

      const updatedNade = res.data as Nade;

      return ok(updatedNade);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async delete(nadeId: string): AppResult<boolean> {
    try {
      await AxiosApi.delete(`${AppConfig.API_URL}/nades/${nadeId}`);

      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async eloGame(eloGame: NadeEloGame) {
    try {
      await AxiosApi.post(`${AppConfig.API_URL}/nades/elogame`, eloGame);
    } catch (error) {
      return;
    }
  }
}

function parseAndFilterNadeLight(data: any[]): NadeLight[] {
  const validNades: NadeLight[] = [];

  for (const nade of data) {
    const parsed = nadeLightSchema.safeParse(nade);
    if (parsed.success) {
      validNades.push(parsed.data);
    } else {
      console.log("Failed to parse nade", parsed.error, nade);
    }
  }
  return validNades;
}
