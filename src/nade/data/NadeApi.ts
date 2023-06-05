import axios from "axios";
import { ok } from "neverthrow";
import { AppConfig } from "../../constants/Constants";
import { CsgoMap } from "../../map/models/CsGoMap";
import {
  Nade,
  NadeLight,
  NadeUpdateBody,
  NadeCreateBody,
} from "../models/Nade";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import { Favorite } from "../../favorites/models/Favorite";
import AxiosApi from "../../core/AxiosInstance";
import { NadeType } from "../models/NadeType";

export class NadeApi {
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

  static async isSlugAvailable(slug: string): Promise<boolean> {
    try {
      const res = await axios.get<boolean>(
        `${AppConfig.API_URL}/nades/${slug}/checkslug`
      );

      const isFree = res.data;
      return isFree;
    } catch (error) {
      return false;
    }
  }

  static async getRecent(): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${AppConfig.API_URL}/nades`);
      const nades = res.data as NadeLight[];

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async getPending(): Promise<NadeLight[]> {
    const res = await AxiosApi.get<NadeLight[]>(
      `${AppConfig.API_URL}/nades/pending`
    );
    const nades = res.data;

    return nades;
  }

  static async getDeclined(): Promise<NadeLight[]> {
    const res = await AxiosApi.get<NadeLight[]>(
      `${AppConfig.API_URL}/nades/declined`
    );
    const nades = res.data;

    return nades;
  }

  static async getDeleted(): Promise<NadeLight[]> {
    const res = await AxiosApi.get<NadeLight[]>(
      `${AppConfig.API_URL}/nades/deleted`
    );

    return res.data;
  }

  static async getByMap(
    mapName: CsgoMap,
    nadeType?: NadeType
  ): AppResult<NadeLight[]> {
    try {
      let url = `${AppConfig.API_URL}/nades/map/${mapName}`;
      if (nadeType) {
        url += `?type=${nadeType}`;
      }
      const res = await axios.get<NadeLight[]>(url);
      const nades = res.data;

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async byId(id: string): AppResult<Nade> {
    try {
      const res = await axios.get(`${AppConfig.API_URL}/nades/${id}`, {
        withCredentials: true,
      });

      const nades = res.data as Nade;
      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async byUser(
    steamId: string,
    csgoMap?: CsgoMap
  ): AppResult<NadeLight[]> {
    try {
      let url = `${AppConfig.API_URL}/nades/user/${steamId}`;

      if (csgoMap) {
        url = url + `?map=${csgoMap}`;
      }

      const res = await axios.get(url);
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
}
