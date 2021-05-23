import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminAuditContainer } from "../../admin/containers/AdminAuditContainer";
import { withPrivlegedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminAuditPage: NextPage = () => {
  return (
    <>
      <SEO title="Audit" canonical="/admin/audit" />
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

export default withPrivlegedUser(AdminAuditPage);
