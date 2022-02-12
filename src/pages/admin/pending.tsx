import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminPendingContainer } from "../../admin/containers/AdminPendingContainer";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminPendingNades: NextPage = () => {
  return (
    <>
      <SEO title="Pending nades" canonical="/admin/pending" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminPendingContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withAuthenticatedUser(AdminPendingNades);
