import { FC } from "react";
import { CrossHairSvg } from "./CrossHairSvg";

export const CrosshairOverlay: FC = ({}) => {
  return (
    <>
      <div className="line-up-img">
        <div className="crosshair">
          <CrossHairSvg />
        </div>
      </div>
      <style jsx>{`
        .line-up-img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(0.5);
          transition: transform 0.3s;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};
