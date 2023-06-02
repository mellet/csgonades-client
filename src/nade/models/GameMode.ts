export const GameModes = {
  csgo: "csgo",
  cs2: "cs2",
};

export type GameModeKeys = keyof typeof GameModes;

type GameModeOption = {
  key: GameModeKeys;
  text: string;
  value: GameModeKeys;
};

export function gameModeString(gameMode?: GameMode) {
  if (!gameMode) {
    return "";
  }
  if (gameMode === "csgo") {
    return "CS:GO";
  } else {
    return "CS2";
  }
}

export function nadeGameModeOptions(): GameModeOption[] {
  const options: GameModeOption[] = [];
  for (const key in GameModes) {
    const gameMode = key as GameModeKeys;
    options.push({
      key: gameMode,
      text: gameModeString(gameMode),
      value: gameMode,
    });
  }
  return options;
}

export type GameMode = keyof typeof GameModes;
