import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminContactContainer } from "../../admin/containers/AdminContactContainer";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const AdminContactPage: NextPage = () => {
  return (
    <>
      <SEO title="Contact" canonical="/admin/contact" />
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

export default withAuthenticatedUser(AdminContactPage);
