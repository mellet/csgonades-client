import { useCallback, useContext, useState, useEffect } from "react";
import { AdminStoreContext } from "./context";
import { UserApi } from "../../api/UserApi";
import { useGetOrUpdateToken } from "../../store/AuthStore/hooks/useGetToken";
import { NadeApi } from "../../nade-data/NadeApi";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { ReportApi } from "../../api/ReportApi";
import {
  AdminRoutes,
  addContactMessages,
  changeRoute,
  addReports,
  addUsers,
} from "./adminSlice";
import { ContactApi } from "./ContactApi";
import { sortByDate } from "../../utils/Common";

const useAdminStoreContext = () => {
  const context = useContext(AdminStoreContext);

  if (!context) {
    throw Error("Could not get AdminStoreContext");
  }

  return context;
};

export const useAdminRoute = () => {
  const { dispatch, state } = useAdminStoreContext();

  const changeAdminRoute = useCallback(
    (route: AdminRoutes) => dispatch(changeRoute(route)),
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
  }, [getToken]);

  return {
    pendingNades,
  };
};

export const useAdminReports = () => {
  const getToken = useGetOrUpdateToken();
  const { state, dispatch } = useAdminStoreContext();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      const res = await ReportApi.getAll(token);
      if (res.isOk()) {
        const reports = [...res.value];
        reports.sort((a, b) => sortByDate(a.createdAt, b.createdAt));

        dispatch(addReports(reports));
      } else {
        console.error("Failed to fetch reports");
      }
    })();
  }, [getToken, dispatch]);

  return {
    reports: state.reports,
  };
};

export const useAdminUsers = () => {
  const getToken = useGetOrUpdateToken();
  const { state, dispatch } = useAdminStoreContext();

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
          dispatch(addUsers(result.value));
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

export const useAdminContact = () => {
  const getToken = useGetOrUpdateToken();
  const { state, dispatch } = useAdminStoreContext();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (!token) {
        return;
      }
      const res = await ContactApi.fetchContactMessages(token);
      if (res.isOk()) {
        const contactMessages = [...res.value];
        contactMessages.sort((a, b) => sortByDate(a.createdAt, b.createdAt));

        dispatch(addContactMessages(contactMessages));
      } else {
        console.error("Failed to fetch reports");
      }
    })();
  }, [dispatch, getToken]);

  return {
    contactMessages: state.contactMessages,
  };
};
