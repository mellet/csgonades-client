import { z } from "zod";

const TechniqueValues = {
  left: "Mouse left",
  right: "Mouse right",
  both: "Mouse both",
  jumpthrow: "Jumpthrow",
  jumpthrowBoth: "Jumpthrow - Middle",
  jumpthrowRight: "Jumpthrow - Underhand",
  jumpthrowW: "Jumpthrow + W",
};

export const TechniqueSchema = z.enum([
  "left",
  "right",
  "both",
  "jumpthrow",
  "jumpthrowBoth",
  "jumpthrowRight",
  "jumpthrowW",
]);

export type Technique = z.infer<typeof TechniqueSchema>;

type TechniqueOption = {
  key: Technique;
  text: string;
  value: Technique;
};

export function techniqueString(tech: Technique): string {
  return TechniqueValues[tech];
}

export function nadeTechniqueOptions(): TechniqueOption[] {
  const options: TechniqueOption[] = [];
  for (const key in TechniqueValues) {
    const objKey = key as Technique;
    const text = techniqueString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
