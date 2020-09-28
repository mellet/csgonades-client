import Link from "next/link";
import { FC, memo } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { FooterDiscord } from "./FooterDiscord";
import { PageCentralize } from "../common/PageCentralize";
import { FooterPaypal } from "./FooterPaypal";

export const Footer: FC = memo(() => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer-wrap">
        <PageCentralize>
          <div className="footer">
            <div className="copyright">© {year} CSGO Nades</div>

            <div className="footer-links">
              <Link href="/privacypolicy" as="/privacypolicy" prefetch={false}>
                <a>Privacy Policy</a>
              </Link>
              <Link href="/contact" as="/contact" prefetch={false}>
                <a>Contact</a>
              </Link>
            </div>

            <div id="discord-join">
              <div id="discord-floating">
                <FooterDiscord />
              </div>
            </div>

            <div id="paypal">
              <div id="paypal-floating">
                <FooterPaypal />
              </div>
            </div>

            <div className="powered-by">
              Powered by{" "}
              <a href="https://steamcommunity.com/" rel="nofollow">
                Steam
              </a>
            </div>
          </div>
        </PageCentralize>
      </div>

      <style jsx>{`
        .footer-wrap {
          background: ${colors.PRIMARY};
          margin-top: 20px;
          padding: 50px ${Dimensions.GUTTER_SIZE}px;
        }

        a {
          color: white;
        }

        a:hover {
          text-decoration: underline;
        }

        .footer {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr min-content;
          grid-template-areas:
            "links . . . ."
            "powered . . . ."
            "copyright . .  paypal  discord";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.footerColor};
          width: 100%;
          padding-bottom: 100px;
        }

        #discord-join {
          justify-self: end;
          grid-area: discord;
          position: relative;
          width: 200px;
        }

        #paypal {
          justify-self: end;
          grid-area: paypal;
          position: relative;
          width: 200px;
        }

        #discord-floating,
        #paypal-floating {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }

        .social {
          grid-area: social;
          justify-self: end;
          display: flex;
        }

        .social-action {
          margin-left: 15px;
          width: 40px;
          height: 40px;
          background: #222;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          border-radius: 5px;
        }

        .social-action:hover {
          background: #121212;
        }

        .copyright {
          grid-area: copyright;
        }

        .footer-links {
          grid-area: links;
          white-space: nowrap;
        }

        .footer-links a {
          margin-right: 10px;
          padding-right: 10px;
          border-right: 1px solid ${colors.footerColor};
        }

        .footer-links a:last-child {
          margin-right: 0;
          padding-right: 0;
          border-right: 0px;
        }

        .powered-by {
          grid-area: powered;
        }

        .version {
          opacity: 0.2;
          font-size: 0.75rem;
          margin-left: 6px;
          grid-area: version;
          text-align: center;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          #discord-join {
            display: none;
          }

          #paypal {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
