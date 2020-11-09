import { useCallback, useContext, useState, useEffect } from "react";
import { AdminRoutes } from "./actions";
import { AdminStoreContext } from "./context";
import { UserApi } from "../../api/UserApi";
import { useGetOrUpdateToken } from "../../store/AuthStore/hooks/useGetToken";
import { NadeApi } from "../../api/NadeApi";
import { NadeLight } from "../../models/Nade/Nade";
import { ReportApi } from "../../api/ReportApi";

export const useAdminRoute = () => {
  const { dispatch, state } = useContext(AdminStoreContext);

  const changeAdminRoute = useCallback(
    (route: AdminRoutes) =>
      dispatch({
        type: "@@admin/CHANGE_ROUTE",
        route,
      }),
    [dispatch]
  );
  return {
    changeAdminRoute,
    route: state.route,
  };
};

export const useAdminPendingNades = () => {
  const getToken = useGetOrUpdateToken();
  const [pendingNades, setPendingNades] = useState<NadeLight[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      const res = await NadeApi.getPending(token);
      if (res.isOk()) {
        setPendingNades(res.value);
      }
    })();
  }, []);

  return {
    pendingNades,
  };
};

export const useAdminReports = () => {
  const getToken = useGetOrUpdateToken();
  const { state, dispatch } = useContext(AdminStoreContext);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      const res = await ReportApi.getAll(token);
      if (res.isOk()) {
        dispatch({
          type: "@@admin/ADD_REPORTS",
          reports: res.value,
        });
      } else {
        console.error("Failed to fetch reports");
      }
    })();
  }, []);

  return {
    reports: state.reports,
  };
};

export const useAdminUsers = () => {
  const getToken = useGetOrUpdateToken();
  const { state, dispatch } = useContext(AdminStoreContext);

  const fetchUsers = useCallback(
    (page: number, limit: number, sortByActivity: boolean) => {
      (async () => {
        const token = await getToken();

        if (!token) {
          console.error("Missing token");
          return;
        }

        const result = await UserApi.fetchUsers(
          page,
          limit,
          sortByActivity,
          token
        );

        if (result.isOk()) {
          dispatch({
            type: "@@admin/ADD_USERS",
            users: result.value,
          });
        }
      })();
    },
    [dispatch, getToken]
  );

  return {
    users: state.users,
    fetchUsers,
  };
};

export const useAdminPage = () => {
  const { dispatch, state } = useContext(AdminStoreContext);

  const { route, pendingNades, reports, users } = state;

  const changeAdminRoute = useCallback(
    (route: AdminRoutes) =>
      dispatch({
        type: "@@admin/CHANGE_ROUTE",
        route,
      }),
    [dispatch]
  );

  return {
    route,
    pendingNades,
    users,
    reports,
    changeAdminRoute,
  };
};
