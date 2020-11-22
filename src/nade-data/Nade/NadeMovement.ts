export const NadeMovements = {
  stationary: "Stationary",
  crouching: "Crouching",
  walking: "Walking",
  running: "Running",
  crouchwalking: "Crouchwalking",
};

export type MovementKeys = keyof typeof NadeMovements;

type MovementOption = {
  key: MovementKeys;
  text: string;
  value: MovementKeys;
};

export function nadeMovementOptions(): MovementOption[] {
  const options: MovementOption[] = [];
  for (const key in NadeMovements) {
    const movement = key as MovementKeys;
    options.push({
      key: movement,
      text: NadeMovements[movement],
      value: movement,
    });
  }
  return options;
}

export type Movement = keyof typeof NadeMovements;
