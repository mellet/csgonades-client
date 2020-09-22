import { FC, memo, useMemo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { PageLink } from "../../common/PageLink";

export const Logo: FC = memo(() => {
  const { theme } = useTheme();

  const logoUrl = useMemo(() => {
    return theme === "light" ? "/logo.png" : "/logo-darkmode.png";
  }, [theme]);

  return (
    <>
      <PageLink href="/" as="/">
        <div id="logo">
          <img key={logoUrl} src={logoUrl} alt="CSGO Nades" />
        </div>
      </PageLink>
      <style jsx>{`
        #logo {
          display: block;
          width: 60px;
        }

        #logo img {
          width: 100%;
          display: block;
        }
      `}</style>
    </>
  );
});
