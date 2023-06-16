const TeamSideValues = {
  both: "Both",
  counterTerrorist: "Counter-Terrorist",
  terrorist: "Terrorist",
};

export type TeamSide = keyof typeof TeamSideValues;
