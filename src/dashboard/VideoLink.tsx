import { FC, useMemo } from "react";
import { FaYoutube } from "react-icons/fa";
import { useTheme } from "../core/settings/useTheme";

type Props = {
  youTubeUrl?: string;
};

export const DashboardVideoLink: FC<Props> = ({ youTubeUrl }) => {
  const { colors } = useTheme();

  const url = useMemo(() => {
    return `https://www.youtube.com/watch?v=${youTubeUrl}`;
  }, [youTubeUrl]);

  if (!youTubeUrl) {
    return null;
  }

  return (
    <>
      <a href={url} target="_blank" rel="noreferrer">
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
