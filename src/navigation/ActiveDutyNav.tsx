import { FC } from "react";
import { useRouter } from "next/router";
import { MapPageLink } from "./components/MapNavLink";
import { NavItem } from "./components/NavItem";
import { CsgoMap } from "../map/models/CsGoMap";

type Props = {
  csMapList: CsgoMap[];
};

export const ActiveDutyNav: FC<Props> = ({ csMapList }) => {
  const { query } = useRouter();
  const selectedMap = query.map as CsgoMap;

  return (
    <>
      <div id="map-nav-wrap">
        <ul>
          {csMapList.map((csMapName) => {
            return (
              <li key={csMapName}>
                <MapPageLink map={csMapName}>
                  <NavItem
                    csMap={csMapName}
                    selected={selectedMap === csMapName}
                  />
                </MapPageLink>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        #map-nav-wrap {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};
