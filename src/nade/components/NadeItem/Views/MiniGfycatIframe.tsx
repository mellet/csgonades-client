import { FC, useEffect, useState } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { isSafari } from "react-device-detect";

type Props = {
  gfyId: string;
  hasAllreadyLoaded?: boolean;
};

export const MiniGfycatIframe: FC<Props> = ({
  gfyId,
  hasAllreadyLoaded = false,
}) => {
  const [loaded, setLoaded] = useState(hasAllreadyLoaded);
  const { colors } = useTheme();

  const videoSpeed = isSafari ? 1 : 3;

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

  return (
    <>
      <div className="gfycat-super-wrap">
        <div className="gfycat-wrap">
          <iframe
            allowFullScreen
            className="gfycat-iframe"
            height="100%"
            onLoad={onVideoLoaded}
            src={`https://gfycat.com/ifr/${gfyId}?hd=0&controls=0&speed=${videoSpeed}`}
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
        }
      `}</style>
    </>
  );
};
