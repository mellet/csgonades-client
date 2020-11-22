import { FC, memo } from "react";
import { capitalize } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import { NadeLight } from "../nade-data/Nade/Nade";

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
          Find the best smokes, flashbangs, molotovs and grenades for{" "}
          {capitalize(map)}
        </h1>
        <h2>Don&apos;t be like BOT Bob, get some nades</h2>
      </div>
      <style jsx>{`
        .map-welcome {
          color: ${colors.TEXT};
          transition: all 0.2s;
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
          margin-top: 10px;
        }
      `}</style>
    </>
  );
});
