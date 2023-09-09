import { z } from "zod";

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

export const NadeMovementSchema = z.enum([
  "stationary",
  "crouching",
  "walking",
  "running",
  "crouchwalking",
]);

export type NadeMovement = z.infer<typeof NadeMovementSchema>;
