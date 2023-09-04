import { FC } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

type Props = {
  onSaveNew: () => void;
  onCancel: () => void;
};

export const AddToolbar: FC<Props> = ({ onSaveNew, onCancel }) => {
  return (
    <>
      <div>
        <button onClick={onSaveNew}>
          <FaSave />
        </button>
        <button onClick={onCancel}>
          <FaTimes />
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
