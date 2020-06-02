import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import Link from "next/link";

type Props = {
  map: CsgoMap;
};

const HARD_LINK = true;

export const MapPageLink: FC<Props> = ({ map, children }) => {
  if (HARD_LINK) {
    return <a href={`/maps/${map}`}>{children}</a>;
  }

  return (
    <>
      <Link href="/maps/[map]" as={`/maps/${map}`}>
        <a>{children}</a>
      </Link>
      <style jsx>{``}</style>
    </>
  );
};
