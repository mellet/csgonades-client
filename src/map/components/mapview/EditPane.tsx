import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";
import { MapStartLocation } from "../../models/NadeStartLocation";
import { FaTimes } from "react-icons/fa";
import { MapEndLocation } from "../../models/NadeEndLocation";

type Props = {
  mapStartLocation: MapStartLocation | MapEndLocation | null;
  onCallOutChange: (val: string) => void;
  onDeleteClick: () => void;
};

export const EditPane: FC<Props> = ({
  mapStartLocation,
  onCallOutChange,
  onDeleteClick,
}) => {
  const calloutName = mapStartLocation?.calloutName || "";

  return (
    <>
      <div>
        <CsgnInput onChange={onCallOutChange} initialValue={calloutName} />

        {false && (
          <button onClick={onDeleteClick}>
            <FaTimes /> Delete
          </button>
        )}
      </div>
      <style jsx>{`
        div {
          position: absolute;
          top: 100px;
          right: 5px;
          background: white;
          z-index: 1;
          padding: 6px;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
