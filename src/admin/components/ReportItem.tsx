import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Report } from "../../models/Report";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { prettyDateTime } from "../../utils/DateUtils";

type Props = {
  report: Report;
};

export const ReportItem: FC<Props> = ({ report }) => {
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
          <Link href={`/nades/[nade]`} as={`/nades/${report.nadeId}`}>
            <button>Nade</button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .report {
          margin-bottom: 30px;
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          color: ${colors.TEXT};
        }

        .report-header {
          background: ${colors.DP02};
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
        }

        .report-body,
        .actions {
          padding: 10px 20px;
        }
      `}</style>
    </>
  );
};
