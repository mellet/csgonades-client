import { FC } from "react";
import Image from "next/image";
import { CsgoMap } from "../../map/models/CsGoMap";
import { useTheme } from "../../core/settings/SettingsHooks";
import { capitalize } from "../../utils/Common";
import { Dimensions } from "../../constants/Constants";

type Props = {
  selected: boolean;
  csMap: CsgoMap;
  isFirst?: boolean;
  isLast?: boolean;
  isNew?: boolean;
};

export const NavItem: FC<Props> = ({
  selected,
  csMap,
  isFirst,
  isLast,
  isNew,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <span className={selected ? "map-link selected" : "map-link"}>
        <div className="nav-icon">
          <Image
            priority
            src={`/mapicons/${csMap}.png`}
            layout="fill"
            objectFit="contain"
            quality={100}
            alt="Mirage icon"
          />
        </div>
        <span className="map-link-label">{capitalize(csMap)}</span>
        {isNew && <span className="new">NEW</span>}
      </span>
      <style jsx>{`
        .map-link {
          display: flex;
          font-weight: 400;
          transition: background 0.1s;
          height: 100%;
          background: transparent;
          color: ${colors.TEXT};
          align-items: center;
          color: rgb(88, 102, 126);
          font-weight: 400;
          padding: 9px 12px;
          border-top: ${!isFirst ? `1px solid ${colors.BORDER}` : 0};
          border-top-left-radius: ${isFirst ? Dimensions.BORDER_RADIUS : 0};
          border-top-right-radius: ${isFirst ? Dimensions.BORDER_RADIUS : 0};
          border-bottom-left-radius: ${isLast ? Dimensions.BORDER_RADIUS : 0};
          border-bottom-right-radius: ${isLast ? Dimensions.BORDER_RADIUS : 0};
        }

        .new {
          display: block;
          font-size: 10px;
          color: ${colors.SUCCESS};
          font-weight: 500;
        }

        .map-link:hover {
          background: ${colors.DP01};
        }

        .map-link:hover > .nav-icon {
          opacity: 1;
        }

        .map-link:hover > .map-link-label {
          opacity: 1;
        }

        .map-link-label {
          margin-left: 10px;
          opacity: 0.8;
          font-size: 15px;
          line-height: 15px;
          color: ${colors.TEXT};
          flex: 1;
        }

        .nav-icon {
          position: relative;
          width: 24px;
          height: 24px;
          opacity: 0.8;
          border-radius: 50%;
          overflow: hidden;
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
      `}</style>
    </>
  );
};
