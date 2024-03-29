import { z } from "zod";

const GameModes = {
  csgo: "csgo",
  cs2: "cs2",
};

type GameModeKeys = keyof typeof GameModes;

type GameModeOption = {
  key: GameModeKeys;
  text: string;
  value: GameModeKeys;
};

function gameModeString(gameMode?: GameMode) {
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

export const gameModeSchema = z.enum(["csgo", "cs2"]);

export type GameMode = z.infer<typeof gameModeSchema>;
