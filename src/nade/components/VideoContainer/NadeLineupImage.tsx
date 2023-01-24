import Image from "next/image";
import { FC, useCallback, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";
import { useGa } from "../../../utils/Analytics";
import { CrossHairSvg } from "./CrossHairSvg";

type Props = {
  url: string;
};

export const NadeLineUpImage: FC<Props> = ({ url }) => {
  const ga = useGa();
  const [hasSentGaEvent, setHasSentGaEvent] = useState(false);
  const [zoomMultiplier, setZoomMultiplier] = useState(1);

  const zoomIn = useCallback(() => {
    if (zoomMultiplier < 4) {
      setZoomMultiplier(zoomMultiplier + 1);
      if (!hasSentGaEvent) {
        ga.event({ category: "nade_page", action: "click_lineup_zoom" });
        setHasSentGaEvent(true);
      }
    }
  }, [zoomMultiplier, ga, hasSentGaEvent]);

  const zoomOut = useCallback(() => {
    if (zoomMultiplier > 1) {
      setZoomMultiplier(zoomMultiplier - 1);
    }
  }, [zoomMultiplier]);

  const imageScale = zoomMultiplier * 1;
  const crossHairScale = zoomMultiplier * 0.5;

  return (
    <>
      <div className="lineup-tab">
        <div className="lineup-actions">
          <button onClick={zoomIn}>
            <FaPlus />
          </button>
          <button onClick={zoomOut}>
            <FaMinus />
          </button>
        </div>
        <div className="img-container">
          <div className="img-wrap">
            <Image
              alt="Nade lineup image"
              fill
              unoptimized
              src={url}
              quality={100}
            />
          </div>
        </div>
        <div className="line-up-img">
          <div className="crosshair">
            <CrossHairSvg />
          </div>
        </div>
      </div>
      <style jsx>{`
        .lineup-tab {
          position: relative;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .lineup-actions {
          display: flex;
          flex-direction: column;
          position: absolute;
          right: ${Dimensions.GUTTER_SIZE}px;
          top: ${Dimensions.GUTTER_SIZE * 2 + 40}px;
          z-index: 1;
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid white;
          overflow: hidden;
        }

        .lineup-actions button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.5);
          height: 36px;
          width: 36px;
          padding: 0;
          margin: 0;
          border-radius: 0;
          cursor: pointer;
          font-size: 20px;
          border: none;
          color: #111;
        }

        .lineup-actions button:hover {
          background: rgba(255, 255, 255, 0.85);
        }

        .lineup-actions button:first-child {
          border-bottom: 1px solid white;
        }

        .crosshair {
          position: absolute;
          top: 0px;
          right: 0px;
          bottom: 0px;
          left: 0px;
          opacity: 0.6;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: scale(${crossHairScale});
          transition: transform 0.3s;
        }

        .img-container {
          transform: scale(${imageScale});
          transition: transform 0.3s;
          height: 100%;
        }

        .img-wrap {
          position: relative;
          height: 100%;
          transform: scale(1);
        }
      `}</style>
    </>
  );
};
