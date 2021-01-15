import { Role } from "../users/models/User";

type DecodedToken = {
  steamId: string;
  role: Role;
  iat: number;
  exp: number;
};

function parseJwt(token: string): DecodedToken {
  const base64Url = token.split(".")[1];
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
  const { exp } = parseJwt(token);
  const now = Date.now();
  const timeLeft = Math.round(exp - now / 1000);

  return timeLeft;
}
