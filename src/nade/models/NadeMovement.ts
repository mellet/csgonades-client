const NadeMovements = {
  crouching: "Crouching",
  crouchwalking: "Crouch walking",
  running: "Running",
  stationary: "Stationary",
  walking: "Walking",
};

export function movementString(movement?: NadeMovement) {
  if (!movement) {
    return "";
  }
  return NadeMovements[movement];
}

export type NadeMovement = keyof typeof NadeMovements;
