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
            fill
            unoptimized
            alt="CSGO Nades logo"
            priority
            src={logoUrl}
            quality={100}
            style={{
              objectFit: "contain",
              objectPosition: "left",
            }}
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
