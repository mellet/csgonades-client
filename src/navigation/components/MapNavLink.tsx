import { FC } from "react";
import { CsMap } from "../../map/models/CsGoMap";
import Link from "next/link";
import { useFilterReset } from "../../map/logic/useFilterReset";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  map: CsMap;
};

export const MapPageLink: FC<Props> = ({ map, children }) => {
  const { resetFilter } = useFilterReset();

  const { colors } = useTheme();

  function onMapLinkClick() {
    resetFilter();
  }

  return (
    <>
      <Link href={`/maps/${map}`} legacyBehavior>
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
