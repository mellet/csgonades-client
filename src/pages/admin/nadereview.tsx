import { FC } from "react";
import { withAuthenticatedUser } from "../../admin/withPrivilegedUser";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { NadeReview } from "../../nadereview/NadeReview";
import { Navigation } from "../../navigation/Navigation";
import { SEO } from "../../shared-components/SEO";

const NadeReviewPage: FC = ({}) => {
  return (
    <>
      <SEO title="Nade review" canonical="/moderator/nadereview" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<NadeReview />}
      />
    </>
  );
};

export default withAuthenticatedUser(NadeReviewPage);
