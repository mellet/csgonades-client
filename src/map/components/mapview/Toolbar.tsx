import { FC, useCallback } from "react";
import { EditToolbar } from "./EditToolbar";
import { FaPlus } from "react-icons/fa";
import { AddToolbar } from "./AddToolbar";
import { MapSelector } from "../../../nade/components/NadeInputs/MapSelector";
import { CsMap } from "../../models/CsGoMap";
import { NadeTypeSelector } from "../../../nade/components/NadeAddWidget/NadeTypeSelector";
import { NadeType } from "../../../nade/models/NadeType";

type Props = {
  selectedType: NadeType;
  onNadeTypeChange: (type: NadeType) => void;
  mode: "start" | "end";
  displayMain?: boolean;
  displayEditActions?: boolean;
  displayAddActions?: boolean;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onCreateNew: () => void;
  onSaveNew: () => void;
  onCancelNew: () => void;
  onToggleEditPane: () => void;
  onChangeCsMap: (csMap: CsMap) => void;
  onSetMode: (mode: "start" | "end") => void;
  onCreateNewEndLocation: () => void;
};

export const Toolbar: FC<Props> = ({
  mode,
  selectedType,
  onCreateNewEndLocation,
  onCancelEdit,
  onSaveEdit,
  onCreateNew,
  onCancelNew,
  onSaveNew,
  onToggleEditPane,
  onChangeCsMap,
  onSetMode,
  onNadeTypeChange,
  displayEditActions,
  displayAddActions,
}) => {
  const onNewPressed = useCallback(() => {
    if (mode == "start") {
      onCreateNew();
    } else {
      onCreateNewEndLocation();
    }
  }, [mode, onCreateNew, onCreateNewEndLocation]);

  return (
    <>
      <div className="toolbar-location-selector">
        <button onClick={() => onSetMode("start")}>Start Locations</button>
        <button onClick={() => onSetMode("end")}>End Locations</button>
        <MapSelector
          hideLabel
          defaultValue={"mirage"}
          onChange={onChangeCsMap}
        />
        <NadeTypeSelector
          hideLabel
          selectedType={selectedType}
          onTypeSelect={onNadeTypeChange}
        />
      </div>

      <div className="toolbar">
        <div className="main">
          {!displayAddActions && (
            <button className="add" onClick={onNewPressed}>
              <FaPlus />
            </button>
          )}
        </div>
        <div className="secondary">
          {displayEditActions && (
            <EditToolbar
              onCancelEdit={onCancelEdit}
              onSaveEdit={onSaveEdit}
              onToggleEditPane={onToggleEditPane}
            />
          )}
          {displayAddActions && (
            <AddToolbar onSaveNew={onSaveNew} onCancel={onCancelNew} />
          )}
        </div>
      </div>
      <style jsx>{`
        .toolbar {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 6px;
          padding: 4px;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
        }

        .main {
          display: flex;
          gap: 12px;
        }

        .secondary {
          display: flex;
          gap: 12px;
        }

        .toolbar-location-selector {
          display: flex;
          gap: 12px;
        }

        .add {
          width: 40px;
          height: 40px;
        }
      `}</style>
    </>
  );
};
