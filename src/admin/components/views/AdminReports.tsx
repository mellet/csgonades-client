import { FC } from "react";
import { useAdminReports } from "../../data/hooks";
import { AdminReportItem } from "../AdminReportItem";
import { AdminPageTitle } from "../AdminPageTitle";

export const AdminReports: FC = () => {
  const { reports } = useAdminReports();

  return (
    <div>
      <AdminPageTitle title="Reports" description="Shows reports on nades." />

      {reports.map((r) => (
        <AdminReportItem key={r.id} report={r} />
      ))}
    </div>
  );
};
