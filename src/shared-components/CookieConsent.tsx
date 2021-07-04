import Link from "next/link";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useCookieConcent } from "../core/global/hooks/useCookieConcent";
import { useTheme } from "../core/settings/SettingsHooks";
import { useGa } from "../utils/Analytics";

export const CookieConsent: FC = memo(() => {
  const ga = useGa();
  const [render, setRender] = useState(false);
  const { colors } = useTheme();
  const { acceptCookieConcent, acceptedCookieConsent } = useCookieConcent();

  const showCookieConsent = !acceptedCookieConsent && render;

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      setRender(true);
    }, 2000);
    return () => clearTimeout(renderTimer);
  }, []);

  const wrapperClassName = useMemo(() => {
    const classNames = ["cookie-consent-wrapper"];
    if (showCookieConsent) {
      classNames.push("visible");
    }
    return classNames.join(" ");
  }, [showCookieConsent]);

  function onCookieConsentAccept() {
    acceptCookieConcent();
    ga.event({
      category: "settings",
      action: "accept_coockie_concent",
    });
  }

  if (acceptedCookieConsent) {
    return null;
  }

  return (
    <>
      <div className={wrapperClassName}>
        <div className="cookie-consent">
          <div className="cookie-icon">
            <FaCookieBite />
          </div>

          <div className="consent-txt">
            In order to give you a better service, CSGO Nades uses{" "}
            <Link href="/privacypolicy">
              <a>cookies</a>
            </Link>{" "}
            for analytics and advertising.
            <br /> By continuing to browse the site you are agreeing to our use
            of cookies.
          </div>

          <div className="close-button">
            <button className="accept-btn" onClick={onCookieConsentAccept}>
              I ACCEPT
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent-wrapper {
          bottom: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          left: 0;
          position: fixed;
          right: 0;
          transform: translateY(100%);
          transition: all 0.3s ease-out;
          z-index: 999;
        }

        .visible {
          transform: translateY(0%);
        }

        .cookie-consent {
          color: ${colors.TEXT};
          display: flex;
          font-size: 16px;
          padding ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP01};
          border-radius: ${Dimensions.BORDER_RADIUS};
          align-items: center;
          margin-bottom: ${Dimensions.GUTTER_SIZE * 2}px;
          border: 3px solid ${colors.PRIMARY};
        }

        .cookie-icon {
          align-items: center;
          display: flex;
          font-size: 1.5em;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .consent-txt {
          font-size: 16px;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .close-button {
          align-items: center;
          display: flex;
        }

        .accept-btn {
          appearance: none;
          background: ${colors.SUCCESS};
          border-radius: 5px;
          border: none;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 16px;
          font-weight: 400;
          outline: none;
          padding: 12px 18px;
          white-space: nowrap;
        }

        .accept-btn:hover {
          background: #9dd91c;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .cookie-consent {
            margin-bottom: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            flex-direction: column;
          }

          .consent-txt,  .cookie-icon {
            text-align: center;
            margin-right: 0;
            margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          }
        }
      `}</style>
    </>
  );
});
