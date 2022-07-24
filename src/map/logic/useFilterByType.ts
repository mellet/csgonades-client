import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { NadeType } from "../../nade/models/NadeType";
import { useGa } from "../../utils/Analytics";

export const useFilterByType = () => {
  const queryType = useQueryNadeType();
  const router = useRouter();
  const ga = useGa();

  const byType = useMemo(() => {
    return queryType || "smoke";
  }, [queryType]);

  const filterByType = useCallback(
    (nadeType: NadeType) => {
      router.replace(
        {
          query: {
            ...router.query,
            type: nadeType,
          },
        },
        undefined,
        { shallow: true }
      );
      ga.event({
        category: "map_page",
        action: `click_filter_type_${nadeType}`,
      });
    },
    [ga, router]
  );

  const resetFilterByType = useCallback(() => {
    const baseUrl = router.asPath.replace(/\?type=([^&#]*)/, "");
    router.replace(baseUrl, undefined, { shallow: true });
  }, [router]);

  return {
    byType,
    filterByType,
    resetFilterByType,
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
