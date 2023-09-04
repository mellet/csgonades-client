import { FC } from "react";
import { DisplayNades, NadeView } from "../components/NadeView/NadeView";
import { CsMap } from "../models/CsGoMap";
import dynamic from "next/dynamic";

const NewMapView = dynamic(
  () => import("./NewMapView/NewMapView").then((m) => m.NewMapView),
  {
    ssr: false,
  }
);

type Props = {
  csMap: CsMap;
  setDisplayNades: (displayNades?: DisplayNades) => void;
  displayNades?: DisplayNades;
};

export const MapViewDesktop: FC<Props> = ({
  csMap,
  setDisplayNades,
  displayNades,
}) => {
  return (
    <>
      <NewMapView
        key={csMap}
        csMap={csMap}
        onDisplayNadesForLocation={setDisplayNades}
      />

      {displayNades && (
        <NadeView
          displayNades={displayNades}
          onDismiss={() => setDisplayNades(undefined)}
        />
      )}
    </>
  );
};
