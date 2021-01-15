import { FC } from "react";
import { useAdminReports } from "../data/hooks";
import { AdminReportItem } from "../ui/AdminReportItem";
import { AdminPageTitle } from "../ui/AdminPageTitle";

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
