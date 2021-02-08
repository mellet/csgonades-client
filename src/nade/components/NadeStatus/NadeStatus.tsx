import { FC, memo } from "react";
import { Status } from "../../models/Status";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { ThemeColors } from "../../../core/settings/Themes";
import { FaExclamationCircle, FaSpinner } from "react-icons/fa";
import { CSGNIcon } from "./CSGNIcon";

type Props = {
  status: Status;
};

const NadeStatus: FC<Props> = memo(({ status }) => {
  const { colors } = useTheme();

  if (status === "accepted") {
    return null;
  }

  function statusText() {
    switch (status) {
      case "pending":
        return (
          <>
            <div className="pending">
              <CSGNIcon icon={<FaSpinner />} spin={true} />
              <span>Waiting for approval</span>
            </div>
            <style jsx>{`
              .pending {
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
                display: flex;
                align-items: center;
              }

              .pending span {
                margin-left: 8px;
              }
            `}</style>
          </>
        );
      case "declined":
        return (
          <>
            <div className="declined">
              <CSGNIcon icon={<FaExclamationCircle />} />
              <span>
                DECLINED!
                <br />
                Read comment and edit the nade to get it approved.
              </span>
            </div>
            <style jsx>{`
              .declined {
                font-size: 14px;
                font-weight: 500;
                display: flex;
              }

              .declined span {
                margin-left: 8px;
              }
            `}</style>
          </>
        );
      case "deleted":
        return (
          <>
            <div className="deleted">
              Deleted, will be removed permanently at a later point
            </div>
            <style jsx>{`
              .declined {
                font-size: 14px;
                font-weight: 500;
                text-transform: uppercase;
              }
            `}</style>
          </>
        );
      default:
        return <></>;
    }
  }

  const statusColors = statusColor(status, colors);

  return (
    <>
      <div className="status-container">{statusText()}</div>
      <style jsx>{`
        .status-container {
          background: ${statusColors.background};
          border: 1px solid ${statusColors.border};
          padding: 16px;
          color: ${statusColors.text};
          border-radius: 8px;
        }
      `}</style>
    </>
  );
});

function statusColor(status: Status, colors: ThemeColors) {
  switch (status) {
    case "accepted":
      return {
        border: colors.BORDER,
        background: "#00f064",
        text: "white",
      };
    case "pending":
      return {
        border: colors.BORDER,
        background: "#f09800",
        text: "white",
      };
    case "declined":
      return {
        border: colors.BORDER,
        background: "#bf0000",
        text: "white",
      };
    case "deleted":
      return {
        border: colors.BORDER,
        background: "#bf0000",
        text: "white",
      };
    default:
      return {
        border: colors.BORDER,
        background: "white",
        text: "#222",
      };
  }
}

export default NadeStatus;
