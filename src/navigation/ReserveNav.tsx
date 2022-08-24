import { FC } from "react";
import { useRouter } from "next/router";
import { MapPageLink } from "./components/MapNavLink";
import { NavItem } from "./components/NavItem";
import { CsgoMap } from "../map/models/CsGoMap";

export const ReserveNav: FC = () => {
  const { query } = useRouter();
  const selectedMap = query.map as CsgoMap;

  return (
    <>
      <div id="map-nav-wrap">
        <ul>
          <li>
            <MapPageLink map="tuscan">
              <NavItem
                csMap="tuscan"
                selected={selectedMap === "tuscan"}
                isNew
              />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="train">
              <NavItem csMap="train" selected={selectedMap === "train"} />
            </MapPageLink>
          </li>

          <li>
            <MapPageLink map="anubis">
              <NavItem csMap="anubis" selected={selectedMap === "anubis"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="cache">
              <NavItem csMap="cache" selected={selectedMap === "cache"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="cobblestone">
              <NavItem
                csMap="cobblestone"
                selected={selectedMap === "cobblestone"}
              />
            </MapPageLink>
          </li>
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
