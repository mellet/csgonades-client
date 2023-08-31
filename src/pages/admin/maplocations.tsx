import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";
import { AdminMapLocations } from "../../admin/containers/AdminMapLocations";

const AdminMapLocationsPage: NextPage = () => {
  return (
    <>
      <SEO title="Map Locations" canonical="/admin/maplocations" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={
          <AdminLayout>
            <AdminMapLocations />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withAuthenticatedUser(AdminMapLocationsPage);
