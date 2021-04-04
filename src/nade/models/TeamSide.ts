export const TeamSideValues = {
  both: "Both",
  counterTerrorist: "Counter-Terrorist",
  terrorist: "Terrorist",
};

export type TeamSide = keyof typeof TeamSideValues;

type TeamSideOption = {
  key: TeamSide;
  text: string;
  value: TeamSide;
};

export function teamSideString(teamSide: TeamSide): string {
  return TeamSideValues[teamSide];
}

export function nadeTeamSideOptions(): TeamSideOption[] {
  const options: TeamSideOption[] = [];
  for (const key in TeamSideValues) {
    const objKey = key as TeamSide;
    const text = teamSideString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
