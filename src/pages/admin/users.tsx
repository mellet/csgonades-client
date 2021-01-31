import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminUserContainer } from "../../admin/containers/AdminUserContainer";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const AdminUsersPage: NextPage = () => {
  return (
    <>
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

export default AdminUsersPage;
