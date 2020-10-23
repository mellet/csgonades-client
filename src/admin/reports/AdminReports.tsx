import { FC } from "react";
import { useAdminReports } from "../../store2/AdminStore/hooks";
import { ReportItem } from "./ReportItem";

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
