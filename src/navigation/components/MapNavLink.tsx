import { FC } from "react";
import { CsgoMap } from "../../map/models/CsGoMap";
import Link from "next/link";
import { useFilterReset } from "../../map/logic/useFilterReset";
import { useTheme } from "../../core/settings/SettingsHooks";
import { useOnNadeClusterClick } from "../../map/components/SuggestedNades/useOnNadeClick";

type Props = {
  map: CsgoMap;
};

export const MapPageLink: FC<Props> = ({ map, children }) => {
  const { resetFilter } = useFilterReset();
  const { dismissSuggested } = useOnNadeClusterClick(map);

  const { colors } = useTheme();

  function onMapLinkClick() {
    resetFilter({ disableAnalytics: true });
    dismissSuggested();
  }

  return (
    <>
      <Link href={`/maps/${map}`}>
        <a onClick={onMapLinkClick}>{children}</a>
      </Link>
      <style jsx>{`
        a {
          display: block;
        }

        a:focus-visible {
          outline: 1px auto ${colors.focusOutline};
        }
      `}</style>
    </>
  );
};
