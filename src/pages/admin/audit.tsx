import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminAuditContainer } from "../../admin/containers/AdminAuditContainer";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const AdminAuditPage: NextPage = () => {
  return (
    <>
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminAuditContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default AdminAuditPage;
