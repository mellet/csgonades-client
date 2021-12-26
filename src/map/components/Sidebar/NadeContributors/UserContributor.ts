import { UserLight } from "../../../../users/models/User";

export interface UserContributor extends UserLight {
  nadeCount: number;
  totalScore: number;
  score: number;
}
