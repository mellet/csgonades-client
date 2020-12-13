import { Role } from "../../../models/User";

type UserAudit = {
  nickname: string;
  steamId: string;
  avatar: string;
  role: Role;
};

type EventName = "updateNade";

export type AuditDto = {
  id: string;
  byUser: UserAudit;
  createdAt: Date;
  name: EventName;
  description: string;
  onNadeId: string;
};
