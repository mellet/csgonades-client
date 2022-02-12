import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminReportContainer } from "../../admin/containers/AdminReportContainer";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminReportsPage: NextPage = () => {
  return (
    <>
      <SEO title="Reports" canonical="/admin/reports" />
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

export default withAuthenticatedUser(AdminReportsPage);
