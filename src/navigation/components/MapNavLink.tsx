import { FC } from "react";
import { CsgoMap } from "../../map/models/CsGoMap";
import Link from "next/link";
import { useFilterReset } from "../../map/data/hooks/useFilterReset";
import { useTheme } from "styled-components";

type Props = {
  map: CsgoMap;
};

export const MapPageLink: FC<Props> = ({ map, children }) => {
  const { resetFilter } = useFilterReset();

  const { colors } = useTheme();

  function onMapLinkClick() {
    resetFilter(true);
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
