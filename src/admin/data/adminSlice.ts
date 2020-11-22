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
  route: AdminRoutes;
  pendingNades: NadeLight[];
  users: User[];
  reports: Report[];
  contactMessages: ContactDTO[];
};

export const initialState: AdminState = {
  route: "pending-nades",
  pendingNades: [],
  users: [],
  reports: [],
  contactMessages: [],
};

const admin = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<AdminRoutes>) {
      state.route = action.payload;
    },
    addPendingNades(state, action: PayloadAction<NadeLight[]>) {
      state.pendingNades = action.payload;
    },
    addUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addReports(state, action: PayloadAction<Report[]>) {
      state.reports = action.payload;
    },
    addContactMessages(state, action: PayloadAction<ContactDTO[]>) {
      state.contactMessages = action.payload;
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
