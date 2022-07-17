import { FC } from "react";
import { MapCoordinates } from "../../models/Nade";

type Props = {
  coords: MapCoordinates;
  size: number;
  color: string;
  label: string;
};

export const MapMarker: FC<Props> = ({ coords, size, color, label }) => {
  return (
    <>
      <div
        className="point"
        style={{ left: coords.x - size / 2, top: coords.y - size / 2 }}
      >
        <span className="label">{label}</span>
      </div>
      <style jsx>{`
        .point {
          position: absolute;
          display: block;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          border: 2px solid ${color};
          z-index: 999;
          background: rgba(255, 255, 255, 0.1);
        }

        .label {
          display: inline-block;
          position: absolute;
          bottom: 100%;
          left: -${50 - size / 4}px;
          width: 100px;
          text-align: center;
          color: white;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};
