import { NadeType } from "../nade/models/NadeType";
import removeMd from "remove-markdown";
import { nadeTypeString } from "../nade/models/NadeType";
import { CsMap } from "../map/models/CsGoMap";
import { dateMinutesAgo } from "./DateUtils";
import { useGameMode } from "../core/useGameMode";

export const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function kFormatter(num: number): string {
  const isBelow1k = Math.abs(num) > 999;

  if (num >= 1_000_000 && num < 1_000_000_000) {
    const viewCount = num / 1_000_000;
    return viewCount.toFixed(1) + "M";
  }

  if (isBelow1k) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return String(Math.sign(num) * Math.abs(num));
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertNever(_: never): any {
  // no-op
}

export const pluralize = (count: number, noun: string, suffix = "s"): string =>
  `${count} ${noun}${count !== 1 ? suffix : ""}`;

export const descriptionSimplify = (value?: string): string => {
  if (!value) {
    return `CS Nades is a website that collects nades for Counter-Strike 2. You can browse CS2 smokes, CS2 flashbangs, CS2 molotovs or he-grenades for the most popular maps.`;
  }

  let desc = removeMd(value);
  desc = desc.replace(/(\r\n|\n|\r)/gm, " ");
  desc = truncateString(desc, 200);
  desc = escapeHtml(desc);
  return desc;
};

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function truncateString(str: string, num: number) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str;
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + "...";
}

export function sortByDate(a: Date | string, b: Date | string): number {
  const first = new Date(a);
  const second = new Date(b);
  return first > second ? -1 : first < second ? 1 : 0;
}

export function generateTitle(
  starPosition?: string,
  endPosition?: string,
  nadeType?: NadeType,
  oneWay?: boolean
): string {
  if (oneWay && endPosition && nadeType) {
    return `${endPosition} One-Way ${nadeTypeString(nadeType)}`;
  }
  if (starPosition && endPosition && nadeType) {
    if (nadeType === "flash") {
      return `${endPosition} ${nadeTypeString(nadeType)}`;
    }

    return `${endPosition} ${nadeTypeString(nadeType)} from ${starPosition}`;
  } else {
    return "No Title";
  }
}

export function generateSeoTitle(
  starPosition?: string,
  endPosition?: string,
  nadeType?: NadeType,
  oneWay?: boolean,
  map?: CsMap
): string {
  if (oneWay && endPosition && nadeType && map) {
    return `${capitalize(map)} ${endPosition} One-Way ${nadeTypeString(
      nadeType
    )}`;
  }
  if (starPosition && endPosition && nadeType && map) {
    if (nadeType === "flash") {
      return `${capitalize(map)} ${endPosition} ${nadeTypeString(nadeType)}`;
    }

    return `${capitalize(map)} ${endPosition} ${nadeTypeString(
      nadeType
    )} from ${starPosition}`;
  } else {
    return "No Title";
  }
}

export function generateNadeItemTitle(
  starPosition?: string,
  endPosition?: string,
  nadeType?: NadeType,
  oneWay?: boolean,
  map?: CsMap
): string[] {
  if (oneWay && endPosition && nadeType) {
    return [
      `${
        map ? capitalize(map) + " " : ""
      }${endPosition} One-Way ${nadeTypeString(nadeType)}`,
      ` from ${starPosition}`,
    ];
  }
  if (starPosition && endPosition && nadeType) {
    return [
      `${map ? capitalize(map) + " " : ""} ${endPosition} ${nadeTypeString(
        nadeType
      )}`,
      ` from ${starPosition}`,
    ];
  } else {
    return ["PREVIEW", "-"];
  }
}

export function isNewNade(createdAt: Date | string) {
  const newDurationDaysHours = 7 * 24;
  const hoursAgoAdded = dateMinutesAgo(createdAt) / 60;

  return hoursAgoAdded < newDurationDaysHours;
}

export function useGameString() {
  const { gameMode } = useGameMode();
  const gameString =
    gameMode === "csgo"
      ? "Counter-Strike Global Offensive"
      : "Counter-Strike 2";
  const short = gameMode === "csgo" ? "CS:GO" : "CS2";
  return {
    fullGameString: gameString,
    shortGameString: short,
  };
}

export const noOp = () => {
  // No-op
};
