import { z } from "zod";
import { Tickrate } from "../../nade/models/NadeTickrate";

export type Role = "administrator" | "moderator" | "user";

export type User = {
  avatar: string;
  bio?: string;
  createdAt: Date;
  email?: string;
  lastActive: Date;
  nickname: string;
  role: Role;
  steamId: string;
  updatedAt: Date;
  defaultTick?: Tickrate;
  numNades?: number;
};

export type UserUpdateDTO = {
  bio?: string;
  createdAt?: Date;
  email?: string;
  nickname?: string;
  defaultTick?: Tickrate;
};

export const UserPartialSchema = z.object({
  avatar: z.string(),
  nickname: z.string(),
  steamId: z.string(),
});

export type UserLight = z.infer<typeof UserPartialSchema>;
