import { NextPage } from "next";
import { UserFinishProfilePage } from "../users/views/UserFinishProfilePage";
import { useSignedInUser } from "../core/authentication/useSignedInUser";
import { SEO } from "../shared-components/SEO";

const FinishProfilePage: NextPage = () => {
  const user = useSignedInUser();

  return (
    <>
      <SEO canonical="/finishprofile" title="Finish profile" />
      {user && <UserFinishProfilePage user={user} />}
    </>
  );
};

export default FinishProfilePage;
