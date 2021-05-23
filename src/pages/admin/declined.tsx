import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminDeclinedContainer } from "../../admin/containers/AdminDeclinedContainer";
import { withPrivlegedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminDeclinedNadesPage: NextPage = () => {
  return (
    <>
      <SEO title="Declined nades" canonical="/admin/declined" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminDeclinedContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withPrivlegedUser(AdminDeclinedNadesPage);
