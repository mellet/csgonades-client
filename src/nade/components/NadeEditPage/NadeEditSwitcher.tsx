import { FC, useState } from "react";
import { Box } from "../../../shared-components/box/Box";
import { useEditNade } from "../../data/NadeEdit/useEditNade";
import { Nade } from "../../models/Nade";
import { NadeEditPaneMenu } from "../NadeEditPane/NadeEditPaneMenu";
import { NadeEditActions } from "./NadeEditActions";
import { NadeEditInfo } from "./NadeEditInfo";
import { NadeEditLineupImage } from "./NadeEditLineupImage";
import { NadeEditMapPosition } from "./NadeEditMapPosition";
import { NadeEditResultImage } from "./NadeEditResultImage";

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
              currentEndCoords={nadeUpdates.mapEndCoord}
              setEndCoords={actions.onSetEndPosCoords}
              map={nadeUpdates.map}
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
