import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  panel: JSX.Element;
  main: JSX.Element;
};

export const UserPageLayout: FC<Props> = ({ main, panel }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="user-page-layout">
        <div className="user-panel">{panel}</div>
        <div className="user-main">{main}</div>
      </div>
      <style jsx>{`
        .user-page-layout {
          display: grid;
          width: 100%;
          background: ${colors.DP00};
          grid-template-columns: 300px 1fr;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-areas:
            "panel main"
            "panel main";
        }

        .user-panel {
          grid-area: panel;
        }

        .user-main {
          grid-area: main;
        }

        .user-panel-stick {
          position: sticky;
          top: ${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
