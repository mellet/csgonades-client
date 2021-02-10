import { FC, memo } from "react";
import { useTheme } from "../core/settings/SettingsHooks";

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

            <div className="copyright">© {year} CSGO Nades</div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          text-align: center;
        }

        .copyright {
          font-size: 12px;
          white-space: nowrap;
          color: #fff;
          text-align: center;
        }
      `}</style>
    </>
  );
});
