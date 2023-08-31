import { FC, useState } from "react";
import { Box } from "../../../shared-components/box/Box";
import { useEditNade } from "../../data/NadeEdit/useEditNade";
import { Nade } from "../../models/Nade";
import { NadeEditPaneMenu } from "../NadeEditPane/NadeEditPaneMenu";
import { NadeEditActions } from "./NadeEditActions";
import { NadeEditInfo } from "./NadeEditInfo";
import { NadeEditLineupImage } from "./NadeEditLineupImage";
import { NadeEditResultImage } from "./NadeEditResultImage";
import dynamic from "next/dynamic";

const NadeEditMapPosition = dynamic(
  () => import("./NadeEditMapPosition").then((m) => m.NadeEditMapPosition),
  {
    ssr: false,
  }
);

type Props = {
  nade: Nade;
};

export type NadeEditPaneOption =
  | "info"
  | "mapPosition"
  | "resultImage"
  | "lineupImage";

export const NadeEditSwitcher: FC<Props> = ({ nade }) => {
  const [currentPane, setCurrentPane] = useState<NadeEditPaneOption>("info");
  const { nadeUpdates, actions } = useEditNade();

  console.log("# nadeUpdates", nadeUpdates);

  return (
    <>
      <div className="nade-edit-wrapper">
        <NadeEditPaneMenu
          currentPane={currentPane}
          setCurrentPane={setCurrentPane}
        />

        <NadeEditActions nade={nade} />

        <Box>
          {currentPane === "info" && <NadeEditInfo nade={nade} />}
          {currentPane === "mapPosition" && nadeUpdates.map && (
            <NadeEditMapPosition
              map={nadeUpdates.map || "dust2"}
              nadeType={nadeUpdates.type || "smoke"}
              selectedMapEndLocationId={nadeUpdates.mapEndLocationId}
              selectedMapStartLocationId={nadeUpdates.mapStartLocationId}
              onSetMapEndLocation={actions.onSetMapEndLocation}
              onSetMapStartLocation={actions.onSetMapStartLocation}
            />
          )}
          {currentPane === "resultImage" && (
            <NadeEditResultImage
              image={nadeUpdates.imageBase64}
              onSetImage={actions.onSetImage}
            />
          )}
          {currentPane === "lineupImage" && (
            <NadeEditLineupImage
              image={nadeUpdates.lineUpImageBase64}
              onSetImage={actions.onSetLineUpImage}
            />
          )}
        </Box>
      </div>
      <style jsx>{`
        .nade-edit-wrapper {
        }
      `}</style>
    </>
  );
};
