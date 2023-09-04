import { FC } from "react";
import { MapPageNades } from "../components/MapPageNades";
import { useNadesForMapFromApi } from "../data/useNadesForMap";
import { CsMap } from "../models/CsGoMap";

type Props = {
  csMap: CsMap;
};

export const MapViewMobile: FC<Props> = ({ csMap }) => {
  const { nades } = useNadesForMapFromApi(csMap);

  return (
    <>
      <MapPageNades allNades={nades} />
    </>
  );
};
