import { FC } from "react";
import { CsgoMap } from "../../map/models/CsGoMap";
import Link from "next/link";

type Props = {
  map: CsgoMap;
};

const HARD_LINK = false;

export const MapPageLink: FC<Props> = ({ map, children }) => {
  if (HARD_LINK) {
    return <a href={`/maps/${map}`}>{children}</a>;
  }

  return (
    <>
      <Link href={`/maps/${map}`}>
        <a>{children}</a>
      </Link>
      <style jsx>{``}</style>
    </>
  );
};
