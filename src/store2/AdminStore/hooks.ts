import { useCallback, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../store/AuthStore/AuthSelectors";
import { AdminRoutes } from "./actions";
import { AdminStoreContext } from "./context";
import { UserApi } from "../../api/UserApi";
import { useGetOrUpdateToken } from "../../store/AuthStore/hooks/useGetToken";

export const useAdminFetchPendingNades = () => {
  const token = useSelector(tokenSelector);

  useEffect(() => {
    console.log("Should fetch pending nades");
  }, [token]);
};

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
  const { state } = useContext(AdminStoreContext);

  return {
    pendingNades: state.pendingNades,
  };
};

export const useAdminReports = () => {
  const { state } = useContext(AdminStoreContext);

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
