import { Role } from "../users/models/User";

type DecodedToken = {
  steamId: string;
  role: Role;
  iat: number;
  exp: number;
};

function parseJwt(token: string): DecodedToken | null {
  const base64Url = token.split(".")[1];

  if (!base64Url) {
    return null;
  }

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function tokenExpiredOrAboutTo(token: string): boolean {
  const timeLeft = timeToExpire(token);
  const secondBeforeExpireToRefresh = 60;

  if (timeLeft < secondBeforeExpireToRefresh) {
    return true;
  }

  return false;
}

export function timeToExpire(token: string) {
  const parsedToken = parseJwt(token);

  if (!parsedToken) {
    console.error("Failed to parse JWT token");
    return Math.max;
  }

  const { exp } = parsedToken;

  const now = Date.now();
  const timeLeft = Math.round(exp - now / 1000);

  return timeLeft;
}
