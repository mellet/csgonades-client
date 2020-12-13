import { NextPage } from "next";
import { FinishProfile } from "../finishprofile/FinishProfile";
import { useSignedInUser } from "../store/AuthStore/AuthHooks";
import { SEO } from "../common/SEO";

const FinishProfilePage: NextPage = () => {
  const user = useSignedInUser();

  return (
    <>
      <SEO canonical="/finishprofile" title="Finish profile" />
      {user && <FinishProfile user={user} />}
    </>
  );
};

export default FinishProfilePage;
