import { z } from "zod";

const StatusValues = {
  accepted: "Accepted",
  declined: "Declined",
  deleted: "Deleted",
  pending: "Pending",
};

export const nadeStatusSchema = z.enum([
  "accepted",
  "declined",
  "deleted",
  "pending",
]);

export type NadeStatus = z.infer<typeof nadeStatusSchema>;

type NadeStatusOption = {
  key: NadeStatus;
  text: string;
  value: NadeStatus;
};

function nadeStatusString(status: NadeStatus): string {
  return StatusValues[status];
}

export function nadeStatusOptions(): NadeStatusOption[] {
  const options: NadeStatusOption[] = [];
  for (const key in StatusValues) {
    const objKey = key as NadeStatus;
    const text = nadeStatusString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
