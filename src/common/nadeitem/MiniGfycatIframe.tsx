import { FC, useState } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { isSafari } from "react-device-detect";

type Props = {
  gfyId: string;
  onVideoReady: () => void;
};

export const MiniGfycatIframe: FC<Props> = ({ gfyId, onVideoReady }) => {
  const [loaded, setLoaded] = useState(false);
  const { colors } = useTheme();

  const videoSpeed = isSafari ? 1 : 3;

  function onVideoLoaded() {
    setLoaded(true);
    onVideoReady();
  }

  return (
    <>
      <div className="gfycat-super-wrap">
        <div className="gfycat-wrap">
          <iframe
            onLoad={onVideoLoaded}
            className="gfycat-iframe"
            src={`https://gfycat.com/ifr/${gfyId}?hd=0&controls=0&speed=${videoSpeed}`}
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        .gfycat-super-wrap {
          overflow: hidden;
          cursor: pointer;
          pointer-events: none;
          background: #121212 url("/loading.gif");
          background-position: 50% 40%;
          background-repeat: no-repeat;
          background-size: 20px;
        }

        .gfycat-wrap {
          position: relative;
          padding-bottom: calc(56.25% + 44px);
          background: ${colors.DP01};
          overflow: hidden;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.3s;
        }

        .gfycat-iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};
