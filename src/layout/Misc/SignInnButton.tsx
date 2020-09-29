import { FC } from "react";
import { FaSteam } from "react-icons/fa";
import { Config, Dimensions } from "../../constants/Constants";

export const SignInnButton: FC = () => {
  return (
    <>
      <div className="steam-login-wrapper">
        <a className="steam-login" href={Config.SIGN_IN_URL} rel="nofollow">
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
          border-radius: 10px;
          align-items: center;
          color: white;
          background: #2295c9;
          padding: 6px 12px;
          transition: background 0.25s;
        }

        .steam-logo {
          transition: transform 0.25s;
          margin-right: 10px;
          font-size: 20px;
          position: relative;
          top: 3px;
          transform: scale(1.3);
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
          transform: scale(1.5);
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
