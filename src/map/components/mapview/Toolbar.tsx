import { FC } from "react";
import { EditToolbar } from "./EditToolbar";
import { FaPlus } from "react-icons/fa";
import { AddToolbar } from "./AddToolbar";
import { MapSelector } from "../../../nade/components/NadeInputs/MapSelector";

type Props = {
  displayMain?: boolean;
  displayEditActions?: boolean;
  displayAddActions?: boolean;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onCreateNew: () => void;
  onSaveNew: () => void;
  onCancelNew: () => void;
  onToggleEditPane: () => void;
};

export const Toolbar: FC<Props> = ({
  onCancelEdit,
  onSaveEdit,
  onCreateNew,
  onCancelNew,
  onSaveNew,
  onToggleEditPane,
  displayEditActions,
  displayAddActions,
}) => {
  return (
    <>
      <div className="toolbar">
        <div className="main">
          <MapSelector
            hideLabel
            defaultValue={"mirage"}
            onChange={() => {
              return;
            }}
          />
          {!displayAddActions && (
            <button onClick={onCreateNew}>
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
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 6px;
          padding: 4px;
          z-index: 1;
          display: flex;
          justify-content: space-between;
        }

        .main {
          display: flex;
          gap: 12px;
        }

        .secondary {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </>
  );
};
