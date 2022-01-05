import { FC, useEffect, useState } from "react";

type Props = {
  gfyId: string;
};

export const GfycatIframe: FC<Props> = ({ gfyId }) => {
  const [loaded, setLoaded] = useState(false);

  function onIframeLoaded() {
    setLoaded(true);
  }

  // Show anyway if loading is taking a while
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="gfycat-super-wrap">
        <div className="gfycat-wrap">
          <iframe
            onLoad={onIframeLoaded}
            className="gfycat-iframe"
            src={`https://gfycat.com/ifr/${gfyId}?hd=1`}
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
          background: #121212 url("/loading.gif");
          background-position: 50% 46.5%;
          background-repeat: no-repeat;
          background-size: 20px;
        }

        .gfycat-wrap {
          position: relative;
          padding-bottom: calc(56.25% + 44px);
          background: #000;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.5s;
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
