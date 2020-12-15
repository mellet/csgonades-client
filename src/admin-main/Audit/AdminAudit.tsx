import { FC } from "react";
import { AdminPageTitle } from "../components/AdminPageTitle";
import { useAdminAudits } from "../data/hooks";
import { AuditItem } from "./AuditItem";

export const AdminAudit: FC = () => {
  const { auditEvents } = useAdminAudits();

  return (
    <>
      <div className="audits">
        <AdminPageTitle title="Audits" description="Shows who changed what." />

        {auditEvents.map((audit) => (
          <AuditItem key={audit.id} auditLogEvent={audit} />
        ))}
      </div>
    </>
  );
};
