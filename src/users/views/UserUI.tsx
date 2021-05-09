import { FC, useState } from "react";
import { NadeLight } from "../../nade/models/Nade";
import { User } from "../models/User";
import { useTheme } from "../../core/settings/SettingsHooks";
import { UserDetails } from "./UserDetails";
import { CsgnList } from "../../shared-components/list/CsgnList";
import { NadeItemMobile } from "../../nade/components/NadeItem/NadeItemMobile";
import { isMobileOnly } from "react-device-detect";
import { NadeItem } from "../../nade/components/NadeItem/NadeItem";
import { Dimensions } from "../../constants/Constants";
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
      <div className="user-container">
        <div className="user-details">
          <UserDetails user={user} />
        </div>
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
      </div>
      <style jsx>{`
        .user-container {
          position: relative;
          display: flex;
          flex-direction: row;
          min-height: 60vh;
        }

        .user-details {
          display: inline-block;
          margin-bottom: 30px;
          max-width: 300px;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
          position: sticky;
          top: ${Dimensions.STICKY_TOP}px;
          align-self: flex-start;
        }

        .user-nades {
          flex: 1;
        }

        .user-nades h2 {
          font-weight: 300;
          color: ${colors.TEXT};
        }

        @media only screen and (max-width: 950px) {
          .user-container {
            flex-direction: column;
          }

          .user-details {
            position: relative;
            top: 0;
          }
        }
      `}</style>
    </>
  );
};
