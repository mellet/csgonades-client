import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Report } from "../../reports/models/Report";
import { useTheme } from "../../core/settings/SettingsHooks";
import { prettyDateTime } from "../../utils/DateUtils";

type Props = {
  report: Report;
};

export const AdminReportItem: FC<Props> = ({ report }) => {
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
          <Link href={`/nades/${report.nadeId}`} passHref>
            <button>Nade</button>
          </Link>
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
      `}</style>
    </>
  );
};
