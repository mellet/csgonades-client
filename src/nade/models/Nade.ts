import { UserPartialSchema } from "../../users/models/User";
import { NadeMovementSchema } from "./NadeMovement";
import { TickrateSchema } from "./NadeTickrate";
import { NadeTypeSchema } from "./NadeType";
import { TechniqueSchema } from "./Technique";
import { nadeStatusSchema } from "./Status";
import { CsMapSchema } from "../../map/models/CsGoMap";
import { TeamSideSchema } from "./TeamSide";
import { gameModeSchema } from "./GameMode";
import { nadeImagesSchema } from "./NadeImages";
import { z } from "zod";

export const NadeSchema = z.object({
  commentCount: z.number(),
  createdAt: z.string().datetime(),
  description: z.string().optional(),
  eloScore: z.number(),
  endPosition: z.string().optional(),
  favoriteCount: z.number(),
  gameMode: gameModeSchema,
  id: z.string(),
  images: nadeImagesSchema,
  isFavorited: z.boolean().optional(),
  isPro: z.boolean().optional(),
  map: CsMapSchema,
  mapStartLocationId: z.string().optional(),
  mapEndLocationId: z.string().optional(),
  movement: NadeMovementSchema,
  oneWay: z.boolean().optional(),
  proUrl: z.string().optional(),
  score: z.number(),
  setPos: z.string().optional(),
  slug: z.string().optional(),
  startPosition: z.string(),
  status: nadeStatusSchema,
  steamId: z.string(),
  teamSide: TeamSideSchema,
  technique: TechniqueSchema,
  tickrate: TickrateSchema,
  type: NadeTypeSchema,
  updatedAt: z.string().datetime(),
  user: UserPartialSchema,
  viewCount: z.coerce.number(),
  youTubeId: z.string(),
  isNew: z.boolean(),
});

export type Nade = z.infer<typeof NadeSchema>;
