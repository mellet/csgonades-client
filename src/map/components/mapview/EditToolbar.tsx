import { FC } from "react";
import { FaInfo, FaSave, FaTimesCircle } from "react-icons/fa";

type Props = {
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onToggleEditPane: () => void;
};

export const EditToolbar: FC<Props> = ({
  onCancelEdit,
  onSaveEdit,
  onToggleEditPane,
}) => {
  return (
    <>
      <div>
        <button onClick={onSaveEdit}>
          <FaSave />
        </button>
        <button onClick={onCancelEdit}>
          <FaTimesCircle />
        </button>
        <button onClick={onToggleEditPane}>
          <FaInfo />
        </button>
      </div>
      <style jsx>{`
        div {
          display: flex;
          gap: 4px;
        }

        button {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};
