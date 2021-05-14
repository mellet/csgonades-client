import { NextPage } from "next";
import { AdminLayout } from "../../admin/AdminLayout";
import { AdminCommentContainer } from "../../admin/containers/AdminCommentsContainer";
import { withPrivlegedUser } from "../../admin/withPrivilegedUser";
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
            <AdminCommentContainer />
          </AdminLayout>
        }
      />
    </>
  );
};

export default withPrivlegedUser(AdminAuditPage);
