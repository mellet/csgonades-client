import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useSignedInUser } from "./authentication/useSignedInUser";

export const UserProfileChecker: FC = () => {
  const router = useRouter();
  const { signedInUser } = useSignedInUser();

  useEffect(() => {
    if (
      !router.pathname.includes("finishprofile") &&
      signedInUser &&
      !signedInUser.email
    ) {
      router.push("/finishprofile");
    }
  }, [signedInUser, router]);

  return <></>;
};
