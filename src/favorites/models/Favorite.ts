export type Favorite = {
  createdAt: Date;
  id: string;
  nadeId: string;
  userId: string;
};

export type FavoriteCreateDTO = Omit<Favorite, "createdAt" | "id">;
