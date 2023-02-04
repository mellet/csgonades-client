import { ReportApi } from "../../../reports/data/ReportApi";
import { sortByDate } from "../../../utils/Common";
import useSWR from "swr";
import { useCallback } from "react";

async function fetchReports() {
  const result = await ReportApi.getAll();
  const resports = [...result];
  resports.sort((a, b) => sortByDate(a.createdAt, b.createdAt));
  return resports;
}

export const useAdminReports = () => {
  const { data, mutate } = useSWR("/admin/reports", fetchReports);

  const removeReport = useCallback(
    (reportId: string) => {
      if (data) {
        mutate([...data.filter((r) => r.id !== reportId)], {
          revalidate: false,
        });
      }
      ReportApi.delete(reportId);
    },
    [data, mutate]
  );

  return { reports: data || [], removeReport };
};
