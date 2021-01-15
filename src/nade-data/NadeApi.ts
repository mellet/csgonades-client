import getConfig from "next/config";
import axios from "axios";
import { ok } from "neverthrow";
import { CsgoMap } from "./Nade/CsGoMap";
import { GfycatData } from "./Nade/GfycatData";
import {
  Nade,
  NadeLight,
  NadeStatusDTO,
  NadeUpdateBody,
  NadeCreateBody,
} from "./Nade/Nade";
import { AppResult, extractApiError } from "../utils/ErrorUtil";

const config = getConfig()?.publicRuntimeConfig;

export class NadeApi {
  static async slugIsFree(slug: string): Promise<boolean> {
    try {
      const res = await axios.get<boolean>(
        `${config.apiUrl}/nades/${slug}/checkslug`
      );

      const isFree = res.data;
      return isFree;
    } catch (error) {
      return false;
    }
  }

  static async getAll(): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${config.apiUrl}/nades`);
      const nades = res.data as NadeLight[];

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async getPending(token: string): AppResult<NadeLight[]> {
    try {
      const res = await axios.get<NadeLight[]>(
        `${config.apiUrl}/nades/pending`,
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
        `${config.apiUrl}/nades/declined`,
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
        `${config.apiUrl}/nades/map/${mapName}`
      );
      const nades = res.data;

      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async byId(id: string): AppResult<Nade> {
    try {
      const res = await axios.get(`${config.apiUrl}/nades/${id}`, {
        withCredentials: true,
      });

      const nades = res.data as Nade;
      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async byUser(steamId: string): AppResult<NadeLight[]> {
    try {
      const res = await axios.get(`${config.apiUrl}/nades/user/${steamId}`);
      const nades = res.data as NadeLight[];
      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async byNadeIdList(nadeIds: string[]): AppResult<NadeLight[]> {
    try {
      const res = await axios.post(`${config.apiUrl}/nades/list`, {
        nadeIds,
      });
      const nades = res.data as NadeLight[];
      return ok(nades);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async save(nadeBody: NadeCreateBody, token: string): AppResult<Nade> {
    try {
      const res = await axios.post(`${config.apiUrl}/nades`, nadeBody, {
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
        `${config.apiUrl}/nades/${nadeId}`,
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
      await axios.delete(`${config.apiUrl}/nades/${nadeId}`, {
        headers: { Authorization: token },
      });

      return ok(true);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async registerView(id: string): Promise<void> {
    try {
      await axios.post(
        `${config.apiUrl}/nades/${id}/countView`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {}
  }

  static async updateNadeStatus(
    nadeId: string,
    updates: NadeStatusDTO,
    token: string
  ): AppResult<Nade> {
    try {
      const res = await axios.patch(
        `${config.apiUrl}/nades/${nadeId}/status`,
        updates,
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

  static async updateUser(
    nadeId: string,
    steamId: string,
    token: string
  ): AppResult<Nade> {
    try {
      const res = await axios.patch(
        `${config.apiUrl}/nades/${nadeId}/setuser/${steamId}`,
        undefined,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedNade = res.data as Nade;

      return ok(updatedNade);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async forceYear(
    nadeId: string,
    year: string,
    token: string
  ): AppResult<Nade> {
    try {
      const result = await axios.patch(
        `${config.apiUrl}/nades/${nadeId}/year/${year}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedNade = result.data as Nade;

      return ok(updatedNade);
    } catch (error) {
      return extractApiError(error);
    }
  }

  static async validateGfycat(gfyIdOrUrl: string): AppResult<GfycatData> {
    try {
      const res = await axios.post(`${config.apiUrl}/nades/validateGfycat`, {
        gfycatIdOrUrl: gfyIdOrUrl,
      });
      const gfycatData = res.data as GfycatData;
      return ok(gfycatData);
    } catch (error) {
      return extractApiError(error);
    }
  }
}
