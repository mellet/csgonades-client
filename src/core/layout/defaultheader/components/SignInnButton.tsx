import { FC } from "react";
import { FaSteam } from "react-icons/fa";
import { AppConfig, Dimensions } from "../../../../constants/Constants";
import { useGa } from "../../../../utils/Analytics";

export const SignInnButton: FC = () => {
  const ga = useGa();

  function onSignInClick() {
    ga.event({
      category: "auth",
      action: "click_signin_button",
    });
  }

  return (
    <>
      <div className="steam-login-wrapper">
        <a
          className="steam-login"
          href={AppConfig.SIGN_IN_URL}
          rel="nofollow"
          onClick={onSignInClick}
        >
          <div className="steam-logo">
            <FaSteam />
          </div>
          <div className="steam-text">
            Sign in with <span className="steam-name">STEAM</span>
          </div>
        </a>
      </div>
      <style jsx>{`
        .steam-login-wrapper {
          display: flex;
          align-items: center;
        }

        .steam-login {
          display: flex;
          border-radius: ${Dimensions.BORDER_RADIUS};
          align-items: center;
          color: white;
          background: #2295c9;
          padding: 0px 6px;
          transition: background 0.25s;
          height: ${Math.round(Dimensions.HEADER_HEIGHT * 0.65)}px;
        }

        .steam-logo {
          transition: transform 0.25s;
          margin-right: 6px;
          font-size: 24px;
          position: relative;
          top: 2px;
          transform: scale(1);
        }

        .steam-text {
          font-weight: 400;
          font-size: 14px;
          white-space: nowrap;
          align-self: center;
        }

        .steam-name {
          font-weight: 500;
        }

        .steam-login:hover {
          background: #0688bd;
        }

        .steam-login:hover > .steam-logo {
          transform: scale(1.1);
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .steam-login {
            border-radius: 5px;
            padding: 5px 10px;
          }

          .steam-text {
            font-size: 12px;
          }
        }
      `}</style>
      <style jsx global>{`
        .steam-logo i {
          display: inline;
        }
      `}</style>
    </>
  );
};
