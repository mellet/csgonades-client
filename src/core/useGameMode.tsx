import { FC, createContext, useContext, useMemo, useState } from "react";
import { GameMode } from "../nade/models/GameMode";

type GameModeState = {
  gameMode: GameMode;
  setGameMode: (gameMode: GameMode) => void;
};

const GameModeContext = createContext<GameModeState>({
  gameMode: "csgo",
  setGameMode: () => {
    return;
  },
});

export const GameModeProvider: FC = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode>("csgo");

  const gameModeValue: GameModeState = useMemo(() => {
    return {
      gameMode,
      setGameMode,
    };
  }, [gameMode, setGameMode]);

  return (
    <GameModeContext.Provider value={gameModeValue}>
      {children}
    </GameModeContext.Provider>
  );
};

export const useGameMode = () => {
  const gameModeContext = useContext(GameModeContext);

  if (!gameModeContext) {
    throw Error("No game mode context available!");
  }

  return gameModeContext;
};
