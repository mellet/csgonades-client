import { FC } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useRouter } from "next/router";
import { MapPageLink } from "./MapNavLink";

export const MapNav: FC = () => {
  const { colors } = useTheme();
  const { query } = useRouter();
  const selectedMap = query.map as string;

  return (
    <>
      <PageCentralize>
        <div id="map-nav-wrap">
          <div id="map-nav">
            <ul>
              <li>
                <MapPageLink map="mirage">
                  <span
                    className={
                      selectedMap === "mirage"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Mirage
                  </span>
                </MapPageLink>
              </li>

              <li>
                <MapPageLink map="inferno">
                  <span
                    className={
                      selectedMap === "inferno"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Inferno
                  </span>
                </MapPageLink>
              </li>
              <li>
                <MapPageLink map="dust2">
                  <span
                    className={
                      selectedMap === "dust2" ? "map-link selected" : "map-link"
                    }
                  >
                    Dust2
                  </span>
                </MapPageLink>
              </li>
              <li>
                <MapPageLink map="overpass">
                  <span
                    className={
                      selectedMap === "overpass"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Overpass
                  </span>
                </MapPageLink>
              </li>
              <li>
                <MapPageLink map="cache">
                  <span
                    className={
                      selectedMap === "cache" ? "map-link selected" : "map-link"
                    }
                  >
                    Cache
                  </span>
                </MapPageLink>
              </li>
              <li>
                <MapPageLink map="train">
                  <span
                    className={
                      selectedMap === "train" ? "map-link selected" : "map-link"
                    }
                  >
                    Train
                  </span>
                </MapPageLink>
              </li>

              <li>
                <MapPageLink map="nuke">
                  <span
                    className={
                      selectedMap === "nuke" ? "map-link selected" : "map-link"
                    }
                  >
                    Nuke
                  </span>
                </MapPageLink>
              </li>
              <li>
                <MapPageLink map="vertigo">
                  <span
                    className={
                      selectedMap === "vertigo"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Vertigo
                  </span>
                </MapPageLink>
              </li>
              <li>
                <MapPageLink map="anubis">
                  <span
                    className={
                      selectedMap === "anubis"
                        ? "map-link selected"
                        : "map-link"
                    }
                  >
                    Anubis
                  </span>
                </MapPageLink>
              </li>
            </ul>
          </div>
        </div>
      </PageCentralize>
      <style jsx>{`
        #map-nav-wrap {
          background: ${colors.PRIMARY};
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.5);
          border-top: 0;
        }

        #map-nav {
          background: ${colors.PRIMARY};
          color: white;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          display: inline-block;
          margin: 0 auto;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }

        ul li {
        }

        .map-link {
          display: flex;
          border-right: 1px solid rgba(0, 0, 0, 0.5);
          padding: 10px 15px;
          color: white;
          font-size: 14px;
          align-items: center;
          font-weight: 400;
          transition: background 0.1s;
        }

        .map-link:hover {
          background: ${colors.filterBgHover};
        }

        .selected {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
