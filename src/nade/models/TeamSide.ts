import { z } from "zod";

export const TeamSideSchema = z.enum(["both", "counterTerrorist", "terrorist"]);

export type TeamSide = z.infer<typeof TeamSideSchema>;
