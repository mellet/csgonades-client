import { FC } from "react";
import { useRouter } from "next/router";
import { MapPageLink } from "./components/MapNavLink";
import { NavItem } from "./components/NavItem";
import { CsMap } from "../map/models/CsGoMap";

type Props = {
  reserveMaps: CsMap[];
};

export const ReserveNav: FC<Props> = ({ reserveMaps }) => {
  const { query } = useRouter();
  const selectedMap = query.map as CsMap;

  return (
    <>
      <div id="map-nav-wrap">
        <ul>
          {reserveMaps.map((csMapName) => {
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

        ul li a {
          display: block;
        }

        ul li:first-child a {
          border-top-left-radius: 0px;
        }
      `}</style>
    </>
  );
};
