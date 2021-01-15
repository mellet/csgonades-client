import { FC, memo } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { PageLink } from "../shared-components/PageLink";

export const SecondaryNav: FC = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="site-nav">
        <PageLink href="/blog" as="/blog" prefetch="false">
          <span className="nav-item">Blog</span>
        </PageLink>
        <PageLink href="/about" as="/about" prefetch="false">
          <span className="nav-item">About</span>
        </PageLink>
        <PageLink href="/contact" as="/contact" prefetch="false">
          <span className="nav-item">Contact</span>
        </PageLink>
        <PageLink href="/privacypolicy" as="/privacypolicy" prefetch="false">
          <span className="nav-item">Privacy Policy</span>
        </PageLink>
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
          background: ${colors.DP02};
          border-top: 1px solid ${colors.BORDER};
        }

        .nav-item:hover {
          background: ${colors.DP01};
        }
      `}</style>
    </>
  );
});
