import { FC, useMemo } from "react";
import { GfycatData } from "../nade/models/GfycatData";
import { FaYoutube } from "react-icons/fa";
import { useTheme } from "../core/settings/useTheme";

type Props = {
  gfycat?: GfycatData;
  youTubeUrl?: string;
};

export const DashboardVideoLink: FC<Props> = ({ gfycat, youTubeUrl }) => {
  const { colors } = useTheme();

  const url = useMemo(() => {
    if (gfycat) {
      return `https://gfycat.com/${gfycat.gfyId}`;
    } else {
      return `https://www.youtube.com/watch?v=${youTubeUrl}`;
    }
  }, [gfycat, youTubeUrl]);

  if (!gfycat && !youTubeUrl) {
    return null;
  }

  return (
    <>
      <a href={url} target="_blank" rel="noreferrer">
        {gfycat && <img src="/icons/gfycatlogo.png" />}
        {youTubeUrl && <FaYoutube size={24} />}
      </a>
      <style jsx>{`
        a {
          width: 34px;
          height: 24px;
          background: ${colors.DP02};
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          color: #ff0000;
          transition: background 0.15s;
        }

        a:hover {
          background: ${colors.DP00};
        }

        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          mix-blend-mode: multiply;
        }
      `}</style>
    </>
  );
};
