import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Report } from "../../models/Report";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  report: Report;
};

export const ReportItem: FC<Props> = ({ report }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="report">
        <p>{report.message}</p>
        <Link href={`/nades/[nade]`} as={`/nades/${report.nadeId}`}>
          <a>NADE</a>
        </Link>
      </div>
      <style jsx>{`
        .report {
          border: 1px solid ${colors.BORDER};
          padding: 12px 18px;
          background: ${colors.DP01};
          border-radius: 4px;
          color: ${colors.TEXT};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
