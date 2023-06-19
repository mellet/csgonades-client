import { FC, useMemo } from "react";
import { NadeStatus } from "../../../models/Status";
import { useTheme } from "../../../../core/settings/useTheme";
import { generateNadeItemTitle } from "../../../../utils/Common";
import { NadeType } from "../../../models/NadeType";
import { NadeIcon } from "../../../../shared-components/nade-icons";
import { useIsAdmin } from "../../../../core/authentication/useIsAdmin";

type Props = {
  endPosition?: string;
  oneWay?: boolean;
  startPosition?: string;
  status: NadeStatus;
  type?: NadeType;
  elo: number;
};

export const NadeItemTitle: FC<Props> = ({
  endPosition,
  oneWay,
  startPosition,
  status,
  type,
  elo,
}) => {
  const isAdmin = useIsAdmin();
  const { colors } = useTheme();
  const [generatedTitle, subTitle] = generateNadeItemTitle(
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
        {isAdmin && <div className="elo">{elo}</div>}
        <h3 className="title-text">
          <span className="main-title">{generatedTitle}</span>
          <span className="sub-title">{subTitle}</span>
        </h3>
        <div className="nade-type-icon">
          <NadeIcon nadeType={type} />
        </div>
      </div>
      <style jsx>{`
        .title {
          background: ${colors.DP02};
          color: ${colors.TEXT};
          overflow: hidden;
          position: relative;
        }

        .elo {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 12px;
          opacity: 0.75;
          color: purple;
        }

        .nade-type-icon {
          display: flex;
          align-items: center;
          bottom: 0;
          opacity: 0.45;
          position: absolute;
          height: 50px;
          width: 50px;
          right: 0;
          transform: scale(1) translateY(25%) translateX(25%);
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
