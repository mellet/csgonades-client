import { FC, memo } from "react";
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
            <span className="nav-item">Blog</span>
          </PageLink>
        </div>
        <div className="nav-item-wrap">
          <PageLink href="/about" as="/about" prefetch="false">
            <span className="nav-item">About</span>
          </PageLink>
        </div>
        <div className="nav-item-wrap">
          <PageLink href="/contact" as="/contact" prefetch="false">
            <span className="nav-item">Contact</span>
          </PageLink>
        </div>
      </div>
      <style jsx>{`
        .site-nav {
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          display: block;
          padding: 8px 16px;
          color: ${colors.TEXT};
          font-size: 15px;
          cursor: pointer;
          background: transparent;
          border-top: 1px solid ${colors.BORDER};
        }

        .nav-item-wrap:first-child .nav-item {
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
        }

        .nav-item:hover {
          background: ${colors.DP01};
        }
      `}</style>
    </>
  );
});
