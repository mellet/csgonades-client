import { NextPage } from "next";
import { useOnSignIn } from "../core/authentication/useOnSignIn";
import { SEO } from "../shared-components/SEO";
import { useTheme } from "../core/settings/SettingsHooks";
import { CSGNIcon } from "../nade/components/NadeStatus/CSGNIcon";
import { FaSpinner } from "react-icons/fa";

const Auth: NextPage = () => {
  const { colors } = useTheme();

  useOnSignIn();

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
