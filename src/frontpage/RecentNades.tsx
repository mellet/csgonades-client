import { FC } from "react";
import {
  useRecentNades,
  useRecentNadesWithFavorites,
} from "../nade/data/useRecentNades";
import { useGameMode } from "../core/useGameMode";
import { RecentNadesLoading } from "./RecentNadesLoading";
import { RecentNadesContent } from "./RecentNadesContent";

export const RecentNades: FC = ({}) => {
  const { gameMode } = useGameMode();
  const { recentNades, isLoading } = useRecentNades(gameMode);
  const recentNadesWithFavorites = useRecentNadesWithFavorites(recentNades);

  return isLoading ? (
    <RecentNadesLoading />
  ) : (
    <RecentNadesContent recentNades={recentNadesWithFavorites} />
  );
};
