import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { NadeEditPaneOption } from "../NadeEditPage/NadeEditSwitcher";
import { NadeEditPane } from "./NadeEditPane";

type Props = {
  currentPane: NadeEditPaneOption;
  setCurrentPane: (pane: NadeEditPaneOption) => void;
};

export const NadeEditPaneMenu: FC<Props> = ({
  currentPane,
  setCurrentPane,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="pane-menu">
        <NadeEditPane
          title="Information"
          onClick={() => setCurrentPane("info")}
          isActive={currentPane === "info"}
        />
        <NadeEditPane
          title="Map Position"
          onClick={() => setCurrentPane("mapPosition")}
          isActive={currentPane === "mapPosition"}
        />
        <NadeEditPane
          title="Result Image"
          onClick={() => setCurrentPane("resultImage")}
          isActive={currentPane === "resultImage"}
        />
        <NadeEditPane
          title="Lineup Image"
          onClick={() => setCurrentPane("lineupImage")}
          isActive={currentPane === "lineupImage"}
        />
      </div>
      <style jsx>{`
        .pane-menu {
          background: ${colors.DP01};
          display: inline-flex;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          border: 1px solid ${colors.BORDER};
          border-bottom: none;
          margin-left: ${Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
