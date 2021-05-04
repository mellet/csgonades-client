import axios from "axios";
import { ok } from "neverthrow";
import { Config } from "../../constants/Constants";
import { CsgoMap } from "../../map/models/CsGoMap";
import { GfycatData } from "../models/GfycatData";
import {
  Nade,
  NadeLight,
  NadeUpdateBody,
  NadeCreateBody,
} from "../models/Nade";
import { AppResult, extractApiError } from "../../utils/ErrorUtil";
import { Favorite } from "../../favorites/models/Favorite";

export class NadeApi {
  static async favoriteNade(
    nadeId: string,
    token: string
  ): AppResult<Favorite> {
    try {
      const res = await axios.post<Favorite>(
        `${Config.API_URL}/nades/${nadeId}/favorite`,
        undefined,
        {
          headers: { Authorization: token },
        }
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async getUncomplete(token: string): AppResult<NadeLight[]> {
    try {
      const res = await axios.get<NadeLight[]>(
        `${Config.API_URL}/admin/uncompleteNades`,
        {
          headers: { Authorization: token },
        }
      );
      return ok(res.data);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async unFavoriteNade(nadeId: string, token: string): Promise<boolean> {
    try {
      await axios.delete<Favorite>(
        `${Config.API_URL}/nades/${nadeId}/favorite`,
        {
          headers: { Authorization: token },
        }
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async isSlugAvailable(slug: string): Promise<boolean> {
    try {
      const res = await axios.get<boolean>(
        `${Config.API_URL}/nades/${slug}/checkslug`
      );

      const isFree = res.data;
      return isFree;
    } catch (error) {
      return false;
    }
  }

  static async getRecent(): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${Config.API_URL}/nades`);
      const nades = res.data as NadeLight[];

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async getPending(token: string): AppResult<NadeLight[]> {
    try {
      const res = await axios.get<NadeLight[]>(
        `${Config.API_URL}/nades/pending`,
        {
          headers: { Authorization: token },
        }
      );
      const nades = res.data;

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async getDeclined(token: string): AppResult<NadeLight[]> {
    try {
      const res = await axios.get<NadeLight[]>(
        `${Config.API_URL}/nades/declined`,
        {
          headers: { Authorization: token },
        }
      );
      const nades = res.data;

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async getByMap(mapName: CsgoMap): AppResult<NadeLight[]> {
    try {
      const res = await axios.get<NadeLight[]>(
        `${Config.API_URL}/nades/map/${mapName}`
      );
      const nades = res.data;

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async byId(id: string): AppResult<Nade> {
    try {
      const res = await axios.get(`${Config.API_URL}/nades/${id}`, {
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
      let url = `${Config.API_URL}/nades/user/${steamId}`;

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

  static async save(nadeBody: NadeCreateBody, token: string): AppResult<Nade> {
    try {
      const res = await axios.post(`${Config.API_URL}/nades`, nadeBody, {
        headers: { Authorization: token },
      });
      const nade = res.data as Nade;
      return ok(nade);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async update(
    nadeId: string,
    updateFields: NadeUpdateBody,
    token: string
  ): AppResult<Nade> {
    try {
      const res = await axios.put(
        `${Config.API_URL}/nades/${nadeId}`,
        updateFields,
        {
          headers: { Authorization: token },
        }
      );

      const updatedNade = res.data as Nade;

      return ok(updatedNade);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async delete(nadeId: string, token: string): AppResult<boolean> {
    try {
      await axios.delete(`${Config.API_URL}/nades/${nadeId}`, {
        headers: { Authorization: token },
      });

      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async validateGfycat(gfyIdOrUrl: string): AppResult<GfycatData> {
    try {
      const res = await axios.post(`${Config.API_URL}/nades/validateGfycat`, {
        gfycatIdOrUrl: gfyIdOrUrl,
      });
      const gfycatData = res.data as GfycatData;
      return ok(gfycatData);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
