import { ReportApi } from "../../../reports/data/ReportApi";
import { sortByDate } from "../../../utils/Common";
import useSWR from "swr";

async function fetchReports() {
  const result = await ReportApi.getAll();
  const resports = [...result];
  resports.sort((a, b) => sortByDate(a.createdAt, b.createdAt));
  return resports;
}

export const useAdminReports = () => {
  const { data } = useSWR("/admin/reports", fetchReports);

  return { reports: data || [] };
};
