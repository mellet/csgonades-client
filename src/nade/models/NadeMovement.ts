export const NadeMovements = {
  crouching: "Crouching",
  crouchwalking: "Crouch walking",
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

export function movementString(movement?: NadeMovement) {
  if (!movement) {
    return "";
  }
  return NadeMovements[movement];
}
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

export type NadeMovement = keyof typeof NadeMovements;
