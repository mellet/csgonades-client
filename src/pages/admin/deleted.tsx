import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminDeletedContainer } from "../../admin/containers/AdminDeletedContainer";
import { withPrivlegedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminDeletedNadesPage: NextPage = () => {
  return (
    <>
      <SEO title="Deleted nades" canonical="/admin/deleted" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminDeletedContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withPrivlegedUser(AdminDeletedNadesPage);
