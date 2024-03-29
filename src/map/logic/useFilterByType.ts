import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { NadeType } from "../../nade/models/NadeType";
import { setQueryParameter } from "./helpers";

export const useFilterByType = () => {
  const queryType = useQueryNadeType();
  const router = useRouter();

  const byType = useMemo(() => {
    return queryType || "smoke";
  }, [queryType]);

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      setQueryParameter(router, "type", nadeType);
    },
    [router]
  );

  return {
    byType,
    filterByType,
  };
};

const useQueryNadeType = (): NadeType | undefined => {
  const { query } = useRouter();

  if (!query.type) {
    return;
  }

  switch (query.type) {
    case "smoke":
      return "smoke";
    case "flash":
      return "flash";
    case "molotov":
      return "molotov";
    case "hegrenade":
      return "hegrenade";
    default:
      return;
  }
};
