import { FC, memo, useMemo } from "react";
import { NadeType } from "../../../nade-data/Nade/NadeType";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../../utils/Common";
import { Dimensions } from "../../../constants/Constants";
import Image from "next/image";

type Props = {
  currentType?: NadeType;
  mobile?: boolean;
  onFilterByType: (type: NadeType) => void;
  type: NadeType;
};

export const NadeTypeButton: FC<Props> = memo(
  ({ type, currentType, mobile, onFilterByType }) => {
    const { colors } = useTheme();
    const iconUrl = iconFromType(type);

    const classNameBuilder = useMemo(() => {
      const base = ["nade-type-btn", "icon"];

      if (currentType === type) {
        base.push("active");
      }
      return base.join(" ");
    }, [currentType, type]);

    function onClick() {
      onFilterByType(type);
    }

    return (
      <>
        {mobile && (
          <button className={classNameBuilder} onClick={onClick}>
            <div className="type-icon">
              {iconUrl && (
                <Image
                  src={iconUrl}
                  width={Dimensions.BUTTON_HEIGHT}
                  height={Dimensions.BUTTON_HEIGHT}
                />
              )}
            </div>
          </button>
        )}
        {!mobile && (
          <button className={classNameBuilder} onClick={onClick}>
            <div className="type-icon">
              {iconUrl && (
                <Image
                  src={iconUrl}
                  width={Dimensions.BUTTON_HEIGHT}
                  height={Dimensions.BUTTON_HEIGHT}
                />
              )}
            </div>
          </button>
        )}

        <style jsx>{`
          .nade-type-btn {
            cursor: pointer;
            border: none;
            background: transparent;
            outline: none;
            width: ${Dimensions.BUTTON_HEIGHT}px;
            height: ${Dimensions.BUTTON_HEIGHT}px;
            background: ${colors.filterBg};
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            padding: 0;
            margin: 0;
            border-radius: 0;
          }

          .nade-type-btn:last-child {
            margin-bottom: 0px;
          }

          .type-icon {
            width: ${Dimensions.BUTTON_HEIGHT}px;
            height: ${Dimensions.BUTTON_HEIGHT}px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .nade-type-btn:hover {
            background: ${colors.filterBgHover};
          }

          .active {
            background: ${colors.filterBgHover};
          }
        `}</style>
        <style global jsx>{`
          .type-icon img {
            transform: scale(0.75);
          }
        `}</style>
      </>
    );
  }
);
