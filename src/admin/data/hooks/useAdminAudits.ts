import { sortByDate } from "../../../utils/Common";
import { AuditApi } from "../AuditApi";
import useSWR from "swr";

async function fetchAudits() {
  const res = await AuditApi.fetchAuditEvents();
  const audits = [...res];
  audits.sort((a, b) => sortByDate(a.createdAt, b.createdAt));
  return audits;
}

export const useAdminAudits = () => {
  const { data } = useSWR("/audits", fetchAudits);

  return {
    auditEvents: data || [],
  };
};
