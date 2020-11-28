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
};

export type UserUpdateDTO = {
  bio?: string;
  createdAt?: Date;
  email?: string;
  nickname?: string;
};

export type UserLight = {
  avatar: string;
  nickname: string;
  steamId: string;
};
