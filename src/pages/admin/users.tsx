import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminUserContainer } from "../../admin/containers/AdminUserContainer";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminUsersPage: NextPage = () => {
  return (
    <>
      <SEO title="Users" canonical="/admin/users" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminUserContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withAuthenticatedUser(AdminUsersPage);
