import { FC, useMemo } from "react";
import { Status } from "../../nade-data/Nade/Status";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType, generateNadeItemTitle } from "../../utils/Common";
import { NadeType } from "../../nade-data/Nade/NadeType";

type Props = {
  type?: NadeType;
  title?: string;
  oneWay?: boolean;
  startPosition?: string;
  endPosition?: string;
  status: Status;
};

export const NadeItemTitle: FC<Props> = ({
  title,
  type,
  status,
  startPosition,
  endPosition,
  oneWay,
}) => {
  const { colors } = useTheme();
  const iconUrl = iconFromType(type);
  const [generatedTitle, subTitle] = generateNadeItemTitle(
    title,
    startPosition,
    endPosition,
    type,
    oneWay
  );

  const titleClassName = useMemo(() => {
    const classNames = ["title"];
    if (status === "pending") {
      classNames.push("pending");
    }
    if (status === "declined") {
      classNames.push("declined");
    }
    return classNames.join(" ");
  }, [status]);

  return (
    <>
      <div className={titleClassName}>
        <h3 className="title-text">
          <span className="main-title">{generatedTitle}</span>
          <span className="sub-title">{subTitle}</span>
        </h3>

        {iconUrl && (
          <img
            className="nade-type-icon"
            src={iconUrl}
            alt={`nade icon ${type}`}
          />
        )}
      </div>
      <style jsx>{`
        .title {
          position: relative;
          background: ${colors.DP02};
          color: ${colors.TEXT};
          overflow: hidden;
        }

        .nade-type-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          transform: scale(1) translateY(15px) translateX(10px);
          opacity: 0.5;
        }

        .title-text {
          grid-area: title;
          font-size: 17px;
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: 0;
        }

        .main-title {
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          display: block;
          margin-bottom: -7px;
          padding-top: 5px;
        }

        .sub-title {
          white-space: nowrap;
          text-align: center;
          font-size: 12px;
          display: block;
          opacity: 0.75;
        }

        .title.pending {
          border: 1px solid ${colors.WARNING};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .title.declined {
          border: 1px solid ${colors.ERROR};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      `}</style>
    </>
  );
};
