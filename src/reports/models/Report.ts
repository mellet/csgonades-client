import { UserLight } from "../../users/models/User";

export type Report = {
  createdAt: Date;
  id: string;
  message: string;
  nadeId: string;
  user?: UserLight;
};

export type ReportAddDto = {
  message: string;
  nadeId: string;
};
