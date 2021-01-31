import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminReportContainer } from "../../admin/containers/AdminReportContainer";
import { withPrivlegedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const AdminReportsPage: NextPage = () => {
  return (
    <>
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminReportContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withPrivlegedUser(AdminReportsPage);
