export const NadeMovements = {
  crouching: "Crouching",
  crouchwalking: "Crouchwalking",
  running: "Running",
  stationary: "Stationary",
  walking: "Walking",
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
