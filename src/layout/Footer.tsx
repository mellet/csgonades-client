import Link from "next/link";
import { FC, memo } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

export const Footer: FC = memo(() => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer-wrap">
        <div className="footer">
          <div className="copyright">© {year} CSGO Nades</div>

          <div className="footer-links">
            <ul>
              <li>
                <Link
                  href="/privacypolicy"
                  as="/privacypolicy"
                  prefetch={false}
                >
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" as="/contact" prefetch={false}>
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="powered-by">
            Powered by{" "}
            <a href="https://steamcommunity.com/" rel="nofollow">
              Steam
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-wrap {
          background: ${colors.PRIMARY};
          padding: 16px;
          margin-right: 1px;
        }

        a {
          color: white;
        }

        a:hover {
          text-decoration: underline;
        }

        .copyright {
          font-size: 14px;
          white-space: nowrap;
          color: #fff;
        }

        .footer-links {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 6px;
          padding-top: 6px;
        }

        .footer-links ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .footer-links a {
          margin-right: 10px;
          padding-right: 10px;
          border-right: 1px solid ${colors.footerColor};
          white-space: nowrap;
          font-size: 14px;
        }

        .footer-links a:last-child {
          margin-right: 0;
          padding-right: 0;
          border-right: 0px;
        }

        .powered-by {
          white-space: nowrap;
          color: #fff;
          font-size: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          margin-top: 6px;
          padding-top: 6px;
        }
      `}</style>
    </>
  );
});
