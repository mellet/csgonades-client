import { FC, memo } from "react";
import { FaEnvelope, FaInfo, FaRss } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../core/settings/SettingsHooks";
import { PageLink } from "../shared-components/PageLink";

export const SecondaryNav: FC = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="site-nav">
        <div className="nav-item-wrap">
          <PageLink href="/blog" as="/blog" prefetch="false">
            <span className="nav-item">
              <span className="nav-item-icon">
                <FaRss />
              </span>
              <span className="nav-item-label">Blog</span>
            </span>
          </PageLink>
        </div>
        <div className="nav-item-wrap">
          <PageLink href="/about" as="/about" prefetch="false">
            <span className="nav-item">
              <span className="nav-item-icon">
                <FaInfo />
              </span>

              <span className="nav-item-label">About</span>
            </span>
          </PageLink>
        </div>
        <div className="nav-item-wrap">
          <PageLink href="/contact" as="/contact" prefetch="false">
            <span className="nav-item">
              <span className="nav-item-icon">
                <FaEnvelope />
              </span>

              <span className="nav-item-label">Contact</span>
            </span>
          </PageLink>
        </div>
      </div>
      <style jsx>{`
        .site-nav {
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 9px 12px;
          color: ${colors.TEXT};
          font-size: 15px;
          line-height: 15px;
          cursor: pointer;
          background: transparent;
          border-top: 1px solid ${colors.BORDER};
        }

        .nav-item-label {
          margin-left: 10px;
          opacity: 0.8;
        }

        .nav-item-icon {
          width: 24px;
          height: 24px;
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .nav-item-wrap:first-child .nav-item {
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
        }

        .nav-item:hover {
          background: ${colors.DP01};
        }

        .nav-item:hover .nav-item-label {
          opacity: 1;
        }
        .nav-item:hover .nav-item-icon {
          opacity: 1;
        }
      `}</style>
    </>
  );
});
