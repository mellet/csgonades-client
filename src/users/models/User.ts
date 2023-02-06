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

export type UserLight = {
  avatar: string;
  nickname: string;
  steamId: string;
};
