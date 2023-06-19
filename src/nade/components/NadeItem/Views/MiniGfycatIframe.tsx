import { FC, useEffect, useState } from "react";
import { useTheme } from "../../../../core/settings/useTheme";
import { isSafari } from "react-device-detect";

type Props = {
  gfyId: string;
  hasAllreadyLoaded?: boolean;
  speed?: "normal" | "fast";
  quality?: "hd" | "sd";
};

export const MiniGfycatIframe: FC<Props> = ({
  gfyId,
  hasAllreadyLoaded = false,
  speed = "fast",
  quality = "sd",
}) => {
  const [loaded, setLoaded] = useState(hasAllreadyLoaded);
  const { colors } = useTheme();
  const baseSpeed = speed === "fast" ? 3 : 1;
  const videoSpeed = isSafari ? 1 : baseSpeed;

  function onVideoLoaded() {
    setLoaded(true);
  }

  // Force load if it takes to long
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const hd = quality === "hd" ? 1 : 0;

  return (
    <>
      <div className="gfycat-super-wrap">
        <div className="gfycat-wrap">
          <iframe
            allowFullScreen
            className="gfycat-iframe"
            height="100%"
            onLoad={onVideoLoaded}
            src={`https://gfycat.com/ifr/${gfyId}?hd=${hd}&controls=0&speed=${videoSpeed}`}
            width="100%"
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        .gfycat-super-wrap {
          background: rgba(0, 0, 0, 0.1) url("/loading.gif");
          background-position: 50% 40%;
          background-repeat: no-repeat;
          background-size: 20px;
          cursor: pointer;
          overflow: hidden;
          pointer-events: none;
          filter: brightness(1.2) saturate(120%) contrast(105%);
        }

        .gfycat-wrap {
          background: ${colors.DP01};
          opacity: ${loaded ? 1 : 0};
          overflow: hidden;
          padding-bottom: calc(56.25% + 44px);
          position: relative;
          transition: opacity 0.5s;
        }

        .gfycat-iframe {
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          border: none;
        }
      `}</style>
    </>
  );
};
