import { FC, memo } from "react";
import { APP_VERSION } from "../constants/Constants";
import { useTheme } from "../core/settings/SettingsHooks";
import { PageLink } from "../shared-components/PageLink";

export const Footer: FC = memo(() => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer-wrap">
        <div className="footer">
          <div className="footer-bottom">
            <div className="powered-by">
              Powered by{" "}
              <a href="https://steamcommunity.com/" rel="nofollow">
                Steam
              </a>
            </div>
            <div className="copyright" title={`Version ${APP_VERSION}`}>
              © {year} CSGO Nades
            </div>
            <div className="legal">
              <PageLink
                href="/privacypolicy"
                as="/privacypolicy"
                prefetch="false"
              >
                <span className="nav-item">Privacy Policy</span>
              </PageLink>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .legal {
          text-align: center;
          font-size: 12px;
          line-height: 12px;
          color: white;
        }

        .legal span {
          color: white;
        }

        .legal span:hover {
          text-decoration: underline;
        }

        .footer-wrap {
          background: ${colors.primaryBtnBg};
        }

        a {
          color: white;
        }

        a:hover {
          text-decoration: underline;
        }

        .footer-links {
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .footer-links a {
          white-space: nowrap;
          font-size: 14px;
          display: block;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding: 10px 16px;
        }

        .powered-by {
          white-space: nowrap;
          color: #fff;
          font-size: 14px;
          line-height: 14px;
          text-align: center;
          margin-bottom: 6px;
        }

        .copyright {
          font-size: 12px;
          line-height: 12px;
          white-space: nowrap;
          color: #fff;
          text-align: center;
          margin-bottom: 6px;
        }
      `}</style>
    </>
  );
});
