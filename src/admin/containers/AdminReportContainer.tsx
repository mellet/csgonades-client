import { FC } from "react";
import { useAdminReports } from "../data/hooks/useAdminReports";
import { AdminReportItem } from "../components/AdminReportItem";
import { AdminPageTitle } from "../components/AdminPageTitle";

export const AdminReportContainer: FC = () => {
  const { reports, removeReport } = useAdminReports();

  return (
    <div>
      <AdminPageTitle title="Reports" description="Shows reports on nades." />

      {reports.map((r) => (
        <AdminReportItem key={r.id} report={r} onDelete={removeReport} />
      ))}
    </div>
  );
};
