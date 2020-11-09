import { FC } from "react";
import Image from "next/image";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { capitalize } from "../../utils/Common";

type Props = {
  selected: boolean;
  csMap: CsgoMap;
};

export const NavItem: FC<Props> = ({ selected, csMap }) => {
  const { colors } = useTheme();
  const containerSize = 22;
  const imgSize = 26;
  return (
    <>
      <span className={selected ? "map-link selected" : "map-link"}>
        <div className="nav-icon">
          <div className="nav-icon-img">
            <Image
              priority
              src={`/mapicons/${csMap}.png`}
              width={imgSize}
              height={imgSize}
              layout="fixed"
              alt="Mirage icon"
            />
          </div>
        </div>
        <span className="map-link-label">{capitalize(csMap)}</span>
      </span>
      <style jsx>{`
        .map-link-label {
          padding: 6px;
          color: ${colors.TEXT};
          opacity: 0.8;
        }

        .map-link {
          display: flex;
          font-size: 14px;
          font-weight: 400;
          transition: background 0.1s;
          height: 100%;
          border-radius: 10px;
          background: transparent;
          color: #111;
          margin-right: 10px;
          align-items: center;
          color: rgb(88, 102, 126);
          font-weight: 400;
        }

        .map-link:hover {
          background: ${colors.DP01};
        }

        .map-link:hover > .nav-icon {
          opacity: 1;
        }

        .selected {
          background: ${colors.DP01};
          color: ${colors.TEXT};
        }

        .selected .nav-icon {
          opacity: 1;
        }

        .selected .map-link-label {
          opacity: 1;
        }

        .nav-icon {
          position: relative;
          width: ${containerSize}px;
          height: ${containerSize}px;
          margin-left: 6px;
          opacity: 0.8;
          border-radius: 50%;
          border: 1px solid ${colors.PRIMARY};
          overflow: hidden;
        }

        .nav-icon-img {
          position: absolute;
          top: -3px;
          left: -3px;
          margin: auto;
        }
      `}</style>
    </>
  );
};
