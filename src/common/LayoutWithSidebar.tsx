import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  sidebar: JSX.Element;
};

export const LayoutWithSidebar: FC<Props> = ({ sidebar, children }) => {
  const { colors } = useTheme();

  return (
    <>
      <div id="layout-with-sidebar">
        <div id="lws-main">{children}</div>
        <aside id="lws-sidebar">{sidebar}</aside>
      </div>
      <style jsx>{`
        #layout-with-sidebar {
          display: grid;
          grid-template-columns: 1fr 300px;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          grid-template-areas:
            "main side"
            "main side";
        }

        #lws-main {
          grid-area: main;
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
        }

        #lws-sidebar {
          grid-area: side;
          background: ${colors.DP02};
          border-left: 1px solid ${colors.BORDER};
          height: calc(100vh - ${Dimensions.HEADER_HEIGHT}px);
          overflow-y: auto;
        }

        @media only screen and (max-width: 1000px) {
          #layout-with-sidebar {
            grid-template-columns: 1fr;
            grid-template-areas:
              "main"
              "side";
          }

          #lws-main,
          #lws-sidebar,
          #layout-with-sidebar {
            height: auto;
          }

          #lws-sidebar {
          }
        }
      `}</style>
    </>
  );
};
