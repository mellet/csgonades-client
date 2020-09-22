export type Vote = {
  id: string;
  nadeId: string;
  bySteamId: string;
  vote: number;
  createdAt: Date;
  updatedAt?: Date;
};
