import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminContactContainer } from "../../admin/containers/AdminContactContainer";
import { withPrivlegedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const AdminContactPage: NextPage = () => {
  return (
    <>
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminContactContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withPrivlegedUser(AdminContactPage);
