import { FC, memo, useMemo } from "react";
import { useTheme } from "../../../settings/SettingsHooks";
import { PageLink } from "../../../../shared-components/PageLink";
import Image from "next/image";
import { Dimensions } from "../../../../constants/Constants";

export const Logo: FC = memo(() => {
  const { theme } = useTheme();

  const logoUrl = useMemo(() => {
    return theme === "light" ? "/logo.png" : "/logo-darkmode.png";
  }, [theme]);

  return (
    <>
      <PageLink href="/">
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
          height: ${Math.round(Dimensions.HEADER_HEIGHT * 0.65)}px;
          position: relative;
          width: 70px;
        }
      `}</style>
    </>
  );
});
