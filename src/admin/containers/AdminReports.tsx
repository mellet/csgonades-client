import { FC } from "react";
import { useAdminReports } from "../data/hooks";
import { ReportItem } from "../components/ReportItem";
import { AdminPageTitle } from "../components/AdminPageTitle";

export const AdminReports: FC = () => {
  const { reports } = useAdminReports();

  return (
    <div>
      <AdminPageTitle title="Reports" description="Shows reports on nades." />

      {reports.map((r) => (
        <ReportItem key={r.id} report={r} />
      ))}
    </div>
  );
};
