import { FC } from "react";
import { AdminPageTitle } from "../ui/AdminPageTitle";
import { useAdminAudits } from "../data/hooks";
import { AdminAuditItem } from "../ui/AdminAuditItem";

export const AdminAuditView: FC = () => {
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
