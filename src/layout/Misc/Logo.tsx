import { FC, memo, useMemo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { PageLink } from "../../common/PageLink";
import Image from "next/image";

export const Logo: FC = memo(() => {
  const { theme } = useTheme();

  const logoUrl = useMemo(() => {
    return theme === "light" ? "/logo.png" : "/logo-darkmode.png";
  }, [theme]);

  return (
    <>
      <PageLink href="/" as="/">
        <div key={logoUrl} id="logo">
          <Image
            priority
            src={logoUrl}
            height={40}
            width={62}
            alt="CSGO Nades"
          />
        </div>
      </PageLink>
      <style jsx>{`
        #logo {
          display: block;
          height: 40px;
        }
      `}</style>
    </>
  );
});
