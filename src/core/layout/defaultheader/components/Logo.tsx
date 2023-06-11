import { FC, memo, useMemo } from "react";
import { useTheme } from "../../../settings/useTheme";
import { PageLink } from "../../../../shared-components/PageLink";
import { Dimensions } from "../../../../constants/Constants";
import { LogoSvg } from "./LogoSvg";

export const Logo: FC = memo(() => {
  const { theme, colors } = useTheme();

  const logoUrl = useMemo(() => {
    return theme === "light" ? "/logo.png" : "/logo-darkmode.png";
  }, [theme]);

  return (
    <>
      <PageLink href="/">
        <div key={logoUrl} id="logo">
          <LogoSvg />
        </div>
      </PageLink>
      <style jsx>{`
        #logo {
          height: ${Math.round(Dimensions.HEADER_HEIGHT * 0.65)}px;
          position: relative;
          color: ${colors.PRIMARY};
          align-items: center;
          font-weight: bold;
          font-size: 20px;
          line-height: 18px;
        }

        .logo-nades {
          color: black;
          margin-left: 2px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
});
