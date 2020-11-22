import { FC } from "react";
import { useAdminReports } from "../data/hooks";
import { ReportItem } from "../components/ReportItem";

export const AdminReports: FC = () => {
  const { reports } = useAdminReports();

  return (
    <div>
      <h2>Reports</h2>
      {reports.map((r) => (
        <ReportItem key={r.id} report={r} />
      ))}
      <style jsx>{``}</style>
    </div>
  );
};
