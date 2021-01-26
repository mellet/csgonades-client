import { FC } from "react";
import { CsgoMap } from "../../map/models/CsGoMap";
import Link from "next/link";
import { useFilterReset } from "../../map/data/hooks/useFilterReset";

type Props = {
  map: CsgoMap;
};

const HARD_LINK = false;

export const MapPageLink: FC<Props> = ({ map, children }) => {
  const { resetFilter } = useFilterReset();

  function onMapLinkClick() {
    resetFilter(true);
  }

  if (HARD_LINK) {
    return <a href={`/maps/${map}`}>{children}</a>;
  }

  return (
    <>
      <Link href={`/maps/${map}`}>
        <a onClick={onMapLinkClick}>{children}</a>
      </Link>
      <style jsx>{``}</style>
    </>
  );
};
