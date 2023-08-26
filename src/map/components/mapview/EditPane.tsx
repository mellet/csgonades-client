import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/TextInput/CsgnInput";
import { NadeStartLocation } from "../../models/NadeStartLocation";

type Props = {
  mapStartLocation: NadeStartLocation;
  onCallOutChange: (val: string) => void;
};

export const EditPane: FC<Props> = ({ mapStartLocation, onCallOutChange }) => {
  return (
    <>
      <div>
        <CsgnInput
          onChange={onCallOutChange}
          initialValue={mapStartLocation.calloutName}
        />
      </div>
      <style jsx>{`
        div {
          position: absolute;
          bottom: 5px;
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
