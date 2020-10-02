import { FC, memo, useEffect, useMemo, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useCookieConcent } from "../store/GlobalStore/GlobalHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

export const CookieConsent: FC = memo(() => {
  const [render, setRender] = useState(false);
  const { colors } = useTheme();
  const { acceptCookieConcent, acceptedCookieConsent } = useCookieConcent();

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      setRender(true);
    }, 2000);
    return () => clearTimeout(renderTimer);
  }, []);

  const wrapperClassName = useMemo(() => {
    const classNames = ["cookie-consent-wrapper"];
    if (!acceptedCookieConsent && render) {
      classNames.push("visible");
    }
    return classNames.join(" ");
  }, [acceptedCookieConsent, render]);

  function onCookieConsentAccept() {
    acceptCookieConcent();
  }

  return (
    <>
      <div className={wrapperClassName}>
        <div className="cookie-consent">
          <div className="cookie-icon">
            <FaCookieBite />
          </div>

          <div className="consent-txt">
            In order to give you a better service CSGO Nades uses{" "}
            <a href="/policy">cookies</a> for analytics and advertising.
            <br /> By continuing to browse the site you are agreeing to our use
            of cookies.
          </div>

          <div className="close-button">
            <button className="accept-btn" onClick={onCookieConsentAccept}>
              I Accept
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent-wrapper {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: space-around;
          transform: translateY(100%);
          transition: all 0.3s ease-out;
          z-index: 999;
        }

        .visible {
          transform: translateY(0%);
        }

        .cookie-consent {
          padding ${Dimensions.GUTTER_SIZE / 2}px;
          color: #fff;
          display: flex;
          flex-direction: row;
          font-size: 16px;
        }

        .cookie-icon {
          display: flex;
          align-items: center;
          font-size: 1.5em;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .consent-txt {
          font-size: 12px;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .close-button {
          display: flex;
          align-items: center;
        }

        .accept-btn {
          appearance: none;
          border: none;
          background: ${colors.PRIMARY};
          white-space: nowrap;
          padding: 10px 20px;
          color: #fff;
          border-radius: 5px;
          font-weight: 400;
          border: none;
          cursor: pointer;
          font-size: 14px;
          outline: none;
        }

        .accept-btn:hover {
          background: #083345;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .cookie-consent {
            flex-direction: column;
            align-items: center;
          }

          .consent-txt {
            text-align: center;
          }

          .consent-txt, .cookie-icon {
            margin: 0;
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          }
        }
      `}</style>
    </>
  );
});
