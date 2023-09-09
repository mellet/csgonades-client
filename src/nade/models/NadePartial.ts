import { z } from "zod";
import { gameModeSchema } from "./GameMode";
import { nadeImagesSchema } from "./NadeImages";
import { NadeMovementSchema } from "./NadeMovement";
import { nadeStatusSchema } from "./Status";
import { TeamSideSchema } from "./TeamSide";
import { TechniqueSchema } from "./Technique";
import { TickrateSchema } from "./NadeTickrate";
import { NadeTypeSchema } from "./NadeType";
import { UserPartialSchema } from "../../users/models/User";

export const nadeLightSchema = z.object({
  commentCount: z.number(),
  createdAt: z.string().datetime(),
  eloScore: z.number(),
  endPosition: z.string().optional(),
  favoriteCount: z.number(),
  gameMode: gameModeSchema,
  id: z.string(),
  images: nadeImagesSchema,
  isFavorited: z.boolean().optional(),
  isNew: z.boolean(),
  isPro: z.boolean().optional(),
  mapEndLocationId: z.string().optional(),
  mapStartLocationId: z.string().optional(),
  movement: NadeMovementSchema,
  oneWay: z.boolean().optional(),
  proUrl: z.string().optional(),
  score: z.number(),
  slug: z.string().optional(),
  startPosition: z.string(),
  status: nadeStatusSchema,
  teamSide: TeamSideSchema,
  technique: TechniqueSchema,
  tickrate: TickrateSchema,
  type: NadeTypeSchema,
  user: UserPartialSchema,
  viewCount: z.coerce.number(),
  youTubeId: z.string(),
});

export type NadeLight = z.infer<typeof nadeLightSchema>;
