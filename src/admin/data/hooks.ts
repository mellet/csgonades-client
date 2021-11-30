import { useCallback, useContext, useState, useEffect } from "react";
import { AdminStoreContext } from "./context";
import { UserApi } from "../../users/data/UserApi";
import { NadeApi } from "../../nade/data/NadeApi";
import { NadeLight } from "../../nade/models/Nade";
import { ReportApi } from "../../reports/data/ReportApi";
import {
  addContactMessages,
  addReports,
  addUsers,
  addAudits,
} from "./adminSlice";
import { ContactApi } from "../../contact/data/ContactApi";
import { sortByDate } from "../../utils/Common";
import { AuditApi } from "./AuiditApi";
import { useAuthToken } from "../../core/authentication/useSession";

const useAdminStoreContext = () => {
  const context = useContext(AdminStoreContext);

  if (!context) {
    throw Error("Could not get AdminStoreContext");
  }

  return context;
};

export const useAdminPendingNades = () => {
  const authToken = useAuthToken();
  const [pendingNades, setPendingNades] = useState<NadeLight[]>([]);

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }
      const res = await NadeApi.getPending(authToken);
      if (res.isOk()) {
        setPendingNades(res.value);
      }
    })();
  }, [authToken]);

  return {
    pendingNades,
  };
};

export const useAdminWorkNades = () => {
  const authToken = useAuthToken();
  const [nades, setNades] = useState<NadeLight[]>([]);

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }
      const res = await NadeApi.getUncomplete(authToken);
      if (res.isOk()) {
        setNades(res.value);
      }
    })();
  }, [authToken]);

  return {
    nades,
  };
};

export const useAdminReports = () => {
  const authToken = useAuthToken();
  const { state, dispatch } = useAdminStoreContext();

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }
      const res = await ReportApi.getAll(authToken);
      if (res.isOk()) {
        const reports = [...res.value];
        reports.sort((a, b) => sortByDate(a.createdAt, b.createdAt));

        dispatch(addReports(reports));
      } else {
        console.error("Failed to fetch reports");
      }
    })();
  }, [authToken, dispatch]);

  return {
    reports: state.reports,
  };
};

export const useAdminUsers = () => {
  const authToken = useAuthToken();
  const { state, dispatch } = useAdminStoreContext();

  const fetchUsers = useCallback(
    (page: number, limit: number, sortByActivity: boolean) => {
      (async () => {
        if (!authToken) {
          console.error("Missing token");
          return;
        }

        const result = await UserApi.fetchUsers(
          page,
          limit,
          sortByActivity,
          authToken
        );

        if (result.isOk()) {
          dispatch(addUsers(result.value));
        }
      })();
    },
    [dispatch, authToken]
  );

  return {
    users: state.users,
    fetchUsers,
  };
};

export const useAdminContact = () => {
  const authToken = useAuthToken();
  const { state, dispatch } = useAdminStoreContext();

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }
      const res = await ContactApi.fetchContactMessages(authToken);
      if (res.isOk()) {
        const contactMessages = [...res.value];
        contactMessages.sort((a, b) => sortByDate(a.createdAt, b.createdAt));

        dispatch(addContactMessages(contactMessages));
      } else {
        console.error("Failed to fetch reports");
      }
    })();
  }, [dispatch, authToken]);

  return {
    contactMessages: state.contactMessages,
  };
};

export const useAdminAudits = () => {
  const authToken = useAuthToken();
  const { state, dispatch } = useAdminStoreContext();

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }
      const res = await AuditApi.fetchAuditEvents(authToken);
      if (res.isOk()) {
        const audits = [...res.value];
        audits.sort((a, b) => sortByDate(a.createdAt, b.createdAt));

        dispatch(addAudits(audits));
      } else {
        console.error("Failed to fetch reports");
      }
    })();
  }, [dispatch, authToken]);

  return {
    auditEvents: state.auditEvents,
  };
};
