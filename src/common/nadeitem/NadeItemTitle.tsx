import { FC, useMemo } from "react";
import { Status } from "../../nade-data/Nade/Status";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType, generateNadeItemTitle } from "../../utils/Common";
import { NadeType } from "../../nade-data/Nade/NadeType";

type Props = {
  endPosition?: string;
  oneWay?: boolean;
  startPosition?: string;
  status: Status;
  title?: string;
  type?: NadeType;
};

export const NadeItemTitle: FC<Props> = ({
  endPosition,
  oneWay,
  startPosition,
  status,
  title,
  type,
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
            alt={`nade icon ${type}`}
            className="nade-type-icon"
            src={iconUrl}
          />
        )}
      </div>
      <style jsx>{`
        .title {
          background: ${colors.DP02};
          color: ${colors.TEXT};
          overflow: hidden;
          position: relative;
        }

        .nade-type-icon {
          bottom: 0;
          opacity: 0.5;
          position: absolute;
          right: 0;
          transform: scale(1) translateY(15px) translateX(10px);
        }

        .title-text {
          display: flex;
          flex-direction: column;
          font-size: 17px;
          grid-area: title;
          margin: 0;
          padding: 0;
        }

        .main-title {
          display: block;
          margin-bottom: -7px;
          padding-top: 5px;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sub-title {
          display: block;
          font-size: 12px;
          opacity: 0.75;
          text-align: center;
          white-space: nowrap;
        }

        .title.pending {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border: 1px solid ${colors.WARNING};
        }

        .title.declined {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border: 1px solid ${colors.ERROR};
        }
      `}</style>
    </>
  );
};
