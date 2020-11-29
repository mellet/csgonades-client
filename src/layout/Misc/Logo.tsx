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
            alt="CSGO Nades logo"
            priority
            src={logoUrl}
            layout="fill"
            objectFit="contain"
            objectPosition="left"
            quality={100}
          />
        </div>
      </PageLink>
      <style jsx>{`
        #logo {
          display: block;
          height: 40px;
          position: relative;
          width: 70px;
          margin-left: -2px;
        }
      `}</style>
    </>
  );
});
