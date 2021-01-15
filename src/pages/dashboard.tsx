import { NextPage } from "next";
import { DashboardPage } from "../dashboard/DashboardPage";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { Navigation } from "../navigation/Navigation";

const Dashboard: NextPage = () => {
  return (
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={<DashboardPage />}
    />
  );
};

export default Dashboard;
