import Image from "next/image";
import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/useTheme";
import { CsgoMap, mapString } from "../../map/models/CsGoMap";

type Props = {
  active: boolean;
  map: CsgoMap;
  onClick: (map: CsgoMap) => void;
};

export const MapNadeSelectorItem: FC<Props> = ({ map, onClick, active }) => {
  const { colors } = useTheme();

  function onItemClick() {
    onClick(map);
  }

  return (
    <>
      <Popup
        content={mapString(map)}
        inverted
        position="bottom center"
        size="mini"
        trigger={
          <button className="user-map-nav-item" onClick={onItemClick}>
            <span className="nav-icon">
              <Image
                fill
                priority
                src={`/mapicons/${map}.png`}
                quality={100}
                alt="Nade icon"
              />
            </span>
          </button>
        }
      />

      <style jsx>{`
        .user-map-nav-item {
          height: 40px;
          width: 40px;
          display: flex;
          background: ${active ? colors.DP03 : "tranparent"};
          border: 1px solid ${colors.buttonBorder};
          cursor: pointer;
          border-right: none;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .user-map-nav-item:hover {
          background: ${colors.DP03};
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
          border-radius: 50%;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
