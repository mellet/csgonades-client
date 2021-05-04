import Image from "next/image";
import { FC } from "react";
import { useTheme } from "styled-components";
import { Dimensions } from "../../constants/Constants";
import { CsgoMap, mapString } from "../../map/models/CsGoMap";

type Props = {
  active: boolean;
  map: CsgoMap;
  onClick: (map: CsgoMap) => void;
};

export const UserNadeMapNavItem: FC<Props> = ({ map, onClick, active }) => {
  const { colors } = useTheme();

  function onItemClick() {
    onClick(map);
  }

  return (
    <>
      <button className="user-map-nav-item" onClick={onItemClick}>
        <span className="nav-icon">
          <Image
            priority
            src={`/mapicons/${map}.png`}
            layout="fill"
            objectFit="contain"
            quality={100}
            alt="Mirage icon"
          />
        </span>
        {mapString(map)}
      </button>
      <style jsx>{`
        .user-map-nav-item {
          border: none;
          padding: 8px 8px;
          display: flex;
          background: ${active ? colors.DP03 : "tranparent"};
          border: 1px solid ${colors.buttonBorder};
          cursor: pointer;
          border-right: none;
          align-items: center;
        }

        .user-map-nav-item:first-child {
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-bottom-left-radius: ${Dimensions.BORDER_RADIUS};
        }

        .user-map-nav-item:last-child {
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
          border-bottom-right-radius: ${Dimensions.BORDER_RADIUS};
          border-right: 1px solid ${colors.buttonBorder};
        }

        .nav-icon {
          display: block;
          width: 20px;
          height: 20px;
          position: relative;
          margin-right: 4px;
        }
      `}</style>
    </>
  );
};
