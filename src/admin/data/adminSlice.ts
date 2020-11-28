import { NadeLight } from "../../nade-data/Nade/Nade";
import { Report } from "../../models/Report";
import { User } from "../../models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactDTO } from "./ContactDTOs";

export type AdminRoutes =
  | "pending-nades"
  | "declined-nades"
  | "user"
  | "reports"
  | "contact";

export type AdminState = {
  contactMessages: ContactDTO[];
  pendingNades: NadeLight[];
  reports: Report[];
  route: AdminRoutes | null;
  users: User[];
};

export const initialState: AdminState = {
  contactMessages: [],
  pendingNades: [],
  reports: [],
  route: null,
  users: [],
};

const admin = createSlice({
  initialState,
  name: "adminSlice",
  reducers: {
    addContactMessages(state, action: PayloadAction<ContactDTO[]>) {
      state.contactMessages = action.payload;
    },
    addPendingNades(state, action: PayloadAction<NadeLight[]>) {
      state.pendingNades = action.payload;
    },
    addReports(state, action: PayloadAction<Report[]>) {
      state.reports = action.payload;
    },
    addUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    changeRoute(state, action: PayloadAction<AdminRoutes>) {
      state.route = action.payload;
    },
  },
});

export const {
  addPendingNades,
  addReports,
  addUsers,
  addContactMessages,
  changeRoute,
} = admin.actions;

export const AdminReducer = admin.reducer;
