import { NextPage } from "next";
import { SEO } from "../shared-components/SEO";
import { useSignedInUser } from "../core/authentication/useSignedInUser";
import { NotificationMain } from "../notification/container/NotificationMain";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { Navigation } from "../navigation/Navigation";

const NotificationNextPage: NextPage = () => {
  const { signedInUser } = useSignedInUser();

  return (
    <>
      <SEO canonical="/notifications" title="Notifications" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={signedInUser ? <NotificationMain /> : <></>}
      />
    </>
  );
};

export default NotificationNextPage;
