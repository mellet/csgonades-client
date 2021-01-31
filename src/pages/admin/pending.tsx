import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminPendingContainer } from "../../admin/containers/AdminPendingContainer";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const AdminPendingNades: NextPage = () => {
  return (
    <>
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

export default AdminPendingNades;
