import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminWelcomeContainer } from "../../admin/containers/AdminWelcomeContainer";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const AdminPage: NextPage = () => {
  return (
    <>
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

export default AdminPage;
