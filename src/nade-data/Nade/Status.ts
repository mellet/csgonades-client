const StatusValues = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
  deleted: "Deleted",
};

export type Status = keyof typeof StatusValues;

type NadeStatusOption = {
  key: Status;
  text: string;
  value: Status;
};

export function nadeStatusString(status: Status): string {
  return StatusValues[status];
}

export function nadeStatusOptions(): NadeStatusOption[] {
  const options: NadeStatusOption[] = [];
  for (const key in StatusValues) {
    const objKey = key as Status;
    const text = nadeStatusString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
