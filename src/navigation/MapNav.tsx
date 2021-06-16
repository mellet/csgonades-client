import { FC } from "react";
import { useRouter } from "next/router";
import { MapPageLink } from "./components/MapNavLink";
import { NavItem } from "./components/NavItem";
import { CsgoMap } from "../map/models/CsGoMap";

export const MapNav: FC = () => {
  const { query } = useRouter();
  const selectedMap = query.map as CsgoMap;

  return (
    <>
      <div id="map-nav-wrap">
        <ul>
          <li>
            <MapPageLink map="mirage">
              <NavItem
                isFirst
                csMap="mirage"
                selected={selectedMap === "mirage"}
              />
            </MapPageLink>
          </li>

          <li>
            <MapPageLink map="inferno">
              <NavItem csMap="inferno" selected={selectedMap === "inferno"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="dust2">
              <NavItem csMap="dust2" selected={selectedMap === "dust2"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="overpass">
              <NavItem csMap="overpass" selected={selectedMap === "overpass"} />
            </MapPageLink>
          </li>

          <li>
            <MapPageLink map="nuke">
              <NavItem csMap="nuke" selected={selectedMap === "nuke"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="vertigo">
              <NavItem csMap="vertigo" selected={selectedMap === "vertigo"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="ancient">
              <NavItem csMap="ancient" selected={selectedMap === "ancient"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="cache">
              <NavItem csMap="cache" selected={selectedMap === "cache"} />
            </MapPageLink>
          </li>
          <li>
            <MapPageLink map="train">
              <NavItem csMap="train" selected={selectedMap === "train"} />
            </MapPageLink>
          </li>
          {false && (
            <li>
              <MapPageLink map="anubis">
                <NavItem csMap="anubis" selected={selectedMap === "anubis"} />
              </MapPageLink>
            </li>
          )}
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
