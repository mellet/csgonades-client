import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { AdminNavigation } from "./components/AdminNavigation";

export const AdminLayout: FC = ({ children }) => {
  return (
    <>
      <div id="admin-layout">
        <div id="admin-nav">
          <AdminNavigation />
        </div>
        <div id="admin-main">{children}</div>
      </div>
      <style jsx>{`
        #admin-layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          grid-template-areas: "nav main";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          margin: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
