import { FC, useState } from "react";
import { NadeLight } from "../../nade/models/NadeLight";
import { User } from "../models/User";
import { useTheme } from "../../core/settings/useTheme";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { CsgoMap, mapString } from "../../map/models/CsGoMap";
import { MapNadeSelector } from "../../shared-components/map-nade-selector/MapNadeSelector";
import { useUserNadesByMap } from "../data/useUserNadesByMap";
import { LoadingSpinner } from "./LoadingSpinner";
import { useGameMode } from "../../core/useGameMode";

type Props = {
  user: User;
};

export const UserUI: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const { gameMode } = useGameMode();
  const [csgoMap, setCsGoMap] = useState<CsgoMap>("mirage");
  const { nades, isLoading } = useUserNadesByMap(
    user.steamId,
    csgoMap,
    gameMode
  );

  const emptyMessage = `${user.nickname} has no nades on ${mapString(csgoMap)}`;

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <>
      <div className="user-nades">
        <h2>Nades by {user.nickname}</h2>
        <MapNadeSelector selectedMap={csgoMap} onMapSelect={setCsGoMap} />

        {isLoading && <LoadingSpinner />}

        {nades && (
          <CsgnList<NadeLight>
            data={nades}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            emptyMessage={emptyMessage}
          />
        )}
      </div>
      <style jsx>{`
        .user-nades {
          min-height: 50vh;
        }

        .user-nades h2 {
          font-weight: 300;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
