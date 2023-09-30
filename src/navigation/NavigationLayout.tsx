import { FC } from "react";
import { Dimensions, LayoutBreakpoint } from "../constants/Constants";
import { useTheme } from "../core/settings/useTheme";
import { GameModeToggle } from "../core/layout/defaultheader/components/GameModeToggle";

type Props = {
  mainNav: JSX.Element;
  secondaryNav: JSX.Element;
  footer: JSX.Element;
};

export const NavigationLayout: FC<Props> = ({
  footer,
  mainNav,
  secondaryNav,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <nav>
        <div className="main">{mainNav}</div>
        <div className="secondary">{secondaryNav}</div>

        <div className="footer">
          <div className="game-toggle">
            <GameModeToggle />
          </div>
          {footer}
        </div>
      </nav>
      <style jsx>{`
        nav {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
        }

        .secondary {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        .main,
        .secondary {
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          overflow: hidden;
        }

        .secondary {
          border-bottom: 0;
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        .game-toggle {
          display: flex;
          justify-content: center;
          padding: 10px;
          background: ${colors.DP03};
        }

        .footer {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          overflow: hidden;
          border: 1px solid ${colors.BORDER};
        }

        @media only screen and (max-width: ${LayoutBreakpoint.TABLET}px) {
          nav {
            height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
            background: ${colors.DP03};
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            border-right: 1px solid ${colors.BORDER};
          }

          .main,
          .secondary,
          .game-toggle {
            margin: 0;
            background: transparent;
            border: none;
            border-radius: 0px;
          }

          .secondary {
            flex: 1;
          }

          .footer {
            border-radius: 0px;
            border: none;
          }
        }
      `}</style>
    </>
  );
};
