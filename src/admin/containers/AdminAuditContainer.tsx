import { FC } from "react";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { useAdminAudits } from "../data/hooks/useAdminAudits";
import { AdminAuditItem } from "../components/AdminAuditItem";

export const AdminAuditContainer: FC = () => {
  const { auditEvents } = useAdminAudits();

  return (
    <>
      <div className="audits">
        <AdminPageTitle title="Audits" description="Shows who changed what." />

        {auditEvents.map((audit) => (
          <AdminAuditItem key={audit.id} auditLogEvent={audit} />
        ))}
      </div>
    </>
  );
};
