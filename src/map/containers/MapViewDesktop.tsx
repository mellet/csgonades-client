import { FC, useState } from "react";
import {
  DisplayNades,
  NadeListViewModal,
} from "../components/NadeView/NadeListViewModal";
import { CsMap } from "../models/CsGoMap";
import dynamic from "next/dynamic";
import { BattleRoyalModal } from "../components/EloGame/BattleRoyalModal";
import { NadePreview } from "./NadePreview";
import { NadeLight } from "../../nade/models/NadePartial";

const NewMapView = dynamic(
  () => import("./NewMapView/NewMapView").then((m) => m.NewMapView),
  {
    ssr: false,
  }
);

type Props = {
  csMap: CsMap;
};

export const MapViewDesktop: FC<Props> = ({ csMap }) => {
  const [displayNades, setDisplayNades] = useState<{
    mapStartLocationId: string;
    mapEndLocationId: string;
  }>();
  const [battleRoyalNades, setBattleRoyalNades] = useState<DisplayNades>();
  const [selectedNade, setSelectedNade] = useState<NadeLight>();

  const onBattleRoyalClose = () => {
    setBattleRoyalNades(undefined);
  };

  return (
    <>
      <NewMapView
        key={csMap}
        csMap={csMap}
        onDisplayNadesForLocation={setDisplayNades}
      />

      {displayNades && (
        <NadeListViewModal
          displayNades={displayNades}
          onDismiss={() => setDisplayNades(undefined)}
          onStartBattleRoyal={setBattleRoyalNades}
          onNadeClick={setSelectedNade}
        />
      )}

      {battleRoyalNades && (
        <BattleRoyalModal
          displayNades={battleRoyalNades}
          onClose={onBattleRoyalClose}
          onFinish={onBattleRoyalClose}
        />
      )}

      {selectedNade && (
        <NadePreview
          partialNade={selectedNade}
          onDismiss={() => setSelectedNade(undefined)}
        />
      )}
    </>
  );
};
