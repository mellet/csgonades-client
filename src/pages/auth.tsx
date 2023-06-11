import { NextPage } from "next";
import { SEO } from "../shared-components/SEO";
import { useTheme } from "../core/settings/useTheme";
import { CSGNIcon } from "../nade/components/NadeStatus/CSGNIcon";
import { FaSpinner } from "react-icons/fa";
import Router from "next/router";
import { useEffect } from "react";
import { useSignedInUser } from "../core/authentication/useSignedInUser";

const Auth: NextPage = () => {
  const { signedInUser } = useSignedInUser();
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!signedInUser) {
        Router.push("/");
      } else {
        if (!signedInUser.email) {
          Router.push("/finishprofile");
        } else {
          Router.push("/");
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [signedInUser]);

  return (
    <>
      <SEO title="Signing in" canonical="/auth" />
      <div className="loading">
        <div className="loading-msg">
          <p className="sign-in-msg">Signing you in!</p>
          <p>
            <CSGNIcon icon={<FaSpinner />} size={34} spin />
          </p>
        </div>
      </div>
      <style jsx>{`
        .sign-in-msg {
          font-weight: 400;
          font-size: 30px;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          background: ${colors.DP00};
          height: 100vh;
          width: 100%;
        }

        .loading-msg {
          text-align: center;
          color: ${colors.TEXT};
          font-size: 24px;
        }
      `}</style>
    </>
  );
};

export default Auth;
