import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminWelcomeContainer } from "../../admin/containers/AdminWelcomeContainer";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminPage: NextPage = () => {
  return (
    <>
      <SEO title="Moderation" canonical="/admin" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminWelcomeContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withAuthenticatedUser(AdminPage);
