import { FC, useState } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { User } from "../models/User";
import { useTheme } from "../../core/settings/SettingsHooks";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItemMobile } from "../../nade/components/NadeItem/NadeItemMobile";
import { isMobileOnly } from "react-device-detect";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { CsgoMap, mapString } from "../../map/models/CsGoMap";
import { MapNadeSelector } from "../../shared-components/map-nade-selector/MapNadeSelector";
import { useUserNadesByMap } from "../data/useUserNadesByMap";
import { LoadingSpinner } from "./LoadingSpinner";

type Props = {
  user: User;
};

export const UserUI: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const [csgoMap, setCsGoMap] = useState<CsgoMap>("mirage");
  const { nades, isLoading } = useUserNadesByMap(user.steamId, csgoMap);

  const emptyMessage = `${user.nickname} has no nades on ${mapString(csgoMap)}`;

  function renderItem(item: NadeLight) {
    if (isMobileOnly) {
      return <NadeItemMobile nade={item} />;
    } else {
      return <NadeItem nade={item} />;
    }
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
