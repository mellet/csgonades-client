import { FC, useState } from "react";
import { MapCoordinates } from "../../nade-data/Nade/Nade";
import { MapPositionModal } from "./MapPositionModal";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { MiniLabel } from "../../createnade/components/MiniLabel";

type Props = {
  endPos?: MapCoordinates;
  map?: CsgoMap;
  onSave: (coords: MapCoordinates) => void;
};

export const MapPositionEditor: FC<Props> = ({ onSave, map, endPos }) => {
  const { colors } = useTheme();
  const [showPositionEditor, setShowPositionEditor] = useState(false);

  const toggleEditor = () => {
    setShowPositionEditor(!showPositionEditor);
  };

  function onSavePos(pos: MapCoordinates) {
    setShowPositionEditor(false);
    onSave(pos);
  }

  return (
    <>
      <MiniLabel value="Overview position" />
      <button className="position-btn" onClick={toggleEditor} disabled={!map}>
        SET OVERVIEW POSITION
      </button>
      {!!map && (
        <MapPositionModal
          onSave={onSavePos}
          visible={showPositionEditor}
          map={map}
          mapEndCoord={endPos}
          onDismiss={toggleEditor}
        />
      )}

      <style jsx>{`
        .position-btn {
          width: 100%;
          background: ${colors.filterBg};
          color: white;
          border: none;
          outline: none;
          height: 41px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 14px;
          cursor: pointer;
        }

        .position-btn:hover {
          background: ${colors.filterBgHover};
        }

        .position-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .position-btn:disabled:hover {
          background: ${colors.filterBg};
        }
      `}</style>
    </>
  );
};
