import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Report } from "../../reports/models/Report";
import { useTheme } from "../../core/settings/SettingsHooks";
import { prettyDateTime } from "../../utils/DateUtils";
import { UserAvatar } from "../../shared-components/UserAvatar";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { SquareButton } from "../../shared-components/buttons/IconButton/SquareButton";

type Props = {
  report: Report;
  onDelete: (reportId: string) => void;
};

export const AdminReportItem: FC<Props> = ({ report, onDelete }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="report">
        <div className="report-header">
          <span>Report</span>

          <span>{prettyDateTime(report.createdAt)}</span>
        </div>
        <div className="report-body">{report.message}</div>

        <div className="actions">
          {report.user && (
            <div className="report-user">
              <UserAvatar user={report.user} size={26} />
            </div>
          )}
          <Link href={`/nades/${report.nadeId}`} passHref legacyBehavior>
            <button className="show-nade-btn">
              Show nade <FaChevronRight />
            </button>
          </Link>

          <SquareButton
            icon={<FaTimes />}
            activeColor={colors.reportRed}
            onClick={() => onDelete(report.id)}
          />
        </div>
      </div>
      <style jsx>{`
        .report {
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
          border: 1px solid ${colors.BORDER};
        }

        .report-header {
          background: ${colors.DP02};
          display: flex;
          justify-content: space-between;
          padding: 10px 20px;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .report-body,
        .actions {
          padding: 10px 20px;
        }

        .report-user {
          margin-right: 20px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .show-nade-btn {
          background: ${colors.buttonPrimaryBg};
          border: none;
          color: white;
          padding: 6px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 16px;
          height: 40px;
          padding: 8px 16px;
          cursor: pointer;
          margin-right: 6px;
        }

        .show-nade-btn:hover {
          background: ${colors.buttonBgHover};
        }
      `}</style>
    </>
  );
};
