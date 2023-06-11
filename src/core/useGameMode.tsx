import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { GameMode } from "../nade/models/GameMode";
import { useGa } from "../utils/Analytics";

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
  const ga = useGa();
  const [gameMode, setGameMode] = useState<GameMode>("csgo");

  const onSetGameMode = useCallback(
    (gameMode: GameMode) => {
      setGameMode(gameMode);
      ga.event({ category: "settings", action: "set_game_mode_" + gameMode });
    },
    [ga]
  );

  const gameModeValue: GameModeState = useMemo(() => {
    return {
      gameMode,
      setGameMode: onSetGameMode,
    };
  }, [gameMode, onSetGameMode]);

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
