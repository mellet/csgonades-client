import { FC, memo } from "react";
import { capitalize } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { Twemoji } from "../common/Twemoji";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageJumbo: FC<Props> = memo(({ map }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className={"map-welcome"}>
        <h1>
          Find and learn the best smoke, flashbang, molotov and grenade spots
          for {capitalize(map)}.
        </h1>
        <h2>
          Don&apos;t be like BOT Bob <Twemoji emoji="🤖" />, get some nades.
        </h2>
      </div>
      <style jsx>{`
        .hidden {
          display: none;
        }

        .map-welcome {
          background: ${colors.DP01};
          padding: 20px 30px;
          border-radius: 5px;
          color: ${colors.TEXT};
          transition: all 0.2s;
        }

        .map-welcome-wrap {
          display: flex;
        }

        .top-placement {
          width: 730px;
          display: flex;
          align-items: center;
        }

        .map-welcome h1,
        .map-welcome h2 {
          font-size: 22px;
          color: ${colors.TEXT};
          font-weight: 300;
          flex: 1;
          margin: 0;
          padding: 0;
        }

        .map-welcome h2 {
          font-size: 18px;
          margin: 0;
          margin-top: 20px;
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
