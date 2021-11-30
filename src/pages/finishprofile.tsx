import { NextPage } from "next";
import { UserFinishProfilePage } from "../users/views/UserFinishProfilePage";
import { SEO } from "../shared-components/SEO";
import { useSignedInUser } from "../core/authentication/useSignedInUser";

const FinishProfilePage: NextPage = () => {
  const { signedInUser } = useSignedInUser();

  return (
    <>
      <SEO canonical="/finishprofile" title="Finish profile" />
      {signedInUser && <UserFinishProfilePage user={signedInUser} />}
    </>
  );
};

export default FinishProfilePage;
