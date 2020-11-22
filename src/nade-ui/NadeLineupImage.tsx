import Image from "next/image";
import { FC } from "react";
import { CrossHair } from "./CrossHair";

type Props = {
  url: string;
};

export const NadeLineUpImage: FC<Props> = ({ url }) => {
  return (
    <>
      <div className={"lineup-tab"}>
        <div className="img-container">
          <Image src={url} width={1920} height={1920 * 0.61} />
        </div>
        <div className="line-up-img">
          <div className="crosshair">
            <CrossHair />
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
          transform: scale(0.4);
          transition: transform 0.3s;
        }

        .img-container {
          transition: transform 0.3s;
        }

        .lineup-tab:hover .crosshair {
          transform: scale(1);
          opacity: 0.9;
        }

        .lineup-tab:hover > .img-container {
          transform: scale(2.5);
        }
      `}</style>
    </>
  );
};
