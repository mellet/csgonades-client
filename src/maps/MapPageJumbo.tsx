import { FC, memo, useMemo } from "react";
import { capitalize } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { useSetMapView } from "../store/MapStore/hooks/useSetMapView";
import { Twemoji } from "../common/Twemoji";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageJumbo: FC<Props> = memo(({ map }) => {
  const { mapView } = useSetMapView();
  const { colors } = useTheme();

  const classNames = useMemo(() => {
    const base = ["map-welcome"];
    if (mapView === "overview") {
      base.push("hidden");
    }
    return base.join(" ");
  }, [mapView]);

  return (
    <>
      <div className={classNames}>
        <h1>
          Find the best smoke, flashbang, molotov and grenade spots for{" "}
          {capitalize(map)}.
        </h1>
        <h2>
          Don&apos;t be like BOT Bob <Twemoji emoji="🤖" />, get some nades.
        </h2>
        <p>
          Channel your inner Global Elite. Sign in and add a nade to the list{" "}
          <Twemoji emoji="🏆" />
        </p>
      </div>
      <style jsx>{`
        .hidden {
          display: none;
        }

        .map-welcome {
          background: ${colors.DP01};
          padding: 40px 30px;
          border-radius: 5px;
          color: ${colors.TEXT};
          transition: all 0.2s;
        }

        .map-welcome-wrap {
          display: flex;
          min-height: 100px;
        }

        .welcome-msg {
          align-self: center;
          margin-right: 30px;
          flex: 1;
        }

        .top-placement {
          width: 730px;
          display: flex;
          align-items: center;
        }

        .map-welcome h1,
        .map-welcome h2 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
          flex: 1;
          margin: 0;
          padding: 0;
        }

        .map-welcome h2 {
          font-size: 20px;
          margin: 0;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        @media only screen and (max-width: 1200px) {
          .top-placement {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
