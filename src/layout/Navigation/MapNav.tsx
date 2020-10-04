import { FC } from "react";
import { PageCentralize } from "../../common/PageCentralize";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useRouter } from "next/router";
import { MapPageLink } from "./MapNavLink";
import { Dimensions } from "../../constants/Constants";
import { ThemeToggler } from "../Misc/ThemeToggler";

export const MapNav: FC = () => {
  const { colors } = useTheme();
  const { query } = useRouter();
  const selectedMap = query.map as string;

  return (
    <>
      <div id="secondary-nav">
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
                      <span className="nav-icon mirage-icon"></span>
                      <span className="map-link-label">Mirage</span>
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
                      <span className="nav-icon inferno-icon"></span>
                      <span className="map-link-label">Inferno</span>
                    </span>
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="dust2">
                    <span
                      className={
                        selectedMap === "dust2"
                          ? "map-link selected"
                          : "map-link"
                      }
                    >
                      <span className="nav-icon dust2-icon"></span>
                      <span className="map-link-label">Dust2</span>
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
                      <span className="nav-icon overpass-icon"></span>
                      <span className="map-link-label">Overpass</span>
                    </span>
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="cache">
                    <span
                      className={
                        selectedMap === "cache"
                          ? "map-link selected"
                          : "map-link"
                      }
                    >
                      <span className="nav-icon cache-icon"></span>
                      <span className="map-link-label">Cache</span>
                    </span>
                  </MapPageLink>
                </li>
                <li>
                  <MapPageLink map="train">
                    <span
                      className={
                        selectedMap === "train"
                          ? "map-link selected"
                          : "map-link"
                      }
                    >
                      <span className="nav-icon train-icon"></span>
                      <span className="map-link-label">Train</span>
                    </span>
                  </MapPageLink>
                </li>

                <li>
                  <MapPageLink map="nuke">
                    <span
                      className={
                        selectedMap === "nuke"
                          ? "map-link selected"
                          : "map-link"
                      }
                    >
                      <span className="nav-icon nuke-icon"></span>
                      <span className="map-link-label">Nuke</span>
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
                      <span className="nav-icon vertigo-icon"></span>
                      <span className="map-link-label">Vertigo</span>
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
                      <span className="nav-icon anubis-icon"></span>
                      <span className="map-link-label">Anubis</span>
                    </span>
                  </MapPageLink>
                </li>
              </ul>
            </div>

            <div id="right-options">
              <div id="theme-toggle">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </PageCentralize>
      </div>
      <style jsx>{`
        #secondary-nav {
          background: ${colors.DP03};
          height: ${Dimensions.NAV_HEIGHT}px;
          border-bottom: 1px solid ${colors.BORDER};
        }

        #map-nav-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: ${Dimensions.NAV_HEIGHT}px;
        }

        #map-nav {
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
          font-size: 14px;
          font-weight: 400;
          transition: background 0.1s;
          height: 100%;
          border-radius: 10px;
          background: transparent;
          color: #111;
          margin-right: 10px;
          align-items: center;
          color: rgb(88, 102, 126);
          font-weight: 400;
        }

        .map-link:hover {
          background: ${colors.DP01};
        }

        .map-link:hover > .nav-icon {
          opacity: 1;
        }

        .selected {
          background: ${colors.DP01};
          color: ${colors.TEXT};
        }

        .map-link-label {
          padding: 6px;
          color: ${colors.TEXT};
          opacity: 0.8;
        }

        .selected .nav-icon {
          opacity: 1;
        }

        .selected .map-link-label {
          opacity: 1;
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          margin-left: 6px;
          opacity: 0.7;
        }

        .mirage-icon {
          background: url("/mapicons/mirage.png");
          background-size: 100%;
        }

        .inferno-icon {
          background: url("/mapicons/inferno.png");
          background-size: 100%;
        }

        .dust2-icon {
          background: url("/mapicons/dust2.png");
          background-size: 100%;
        }

        .overpass-icon {
          background: url("/mapicons/overpass.png");
          background-size: 100%;
        }

        .cache-icon {
          background: url("/mapicons/cache.png");
          background-size: 100%;
        }

        .train-icon {
          background: url("/mapicons/train.png");
          background-size: 100%;
        }

        .nuke-icon {
          background: url("/mapicons/nuke.png");
          background-size: 100%;
        }

        .vertigo-icon {
          background: url("/mapicons/vertigo.png");
          background-size: 100%;
        }

        .anubis-icon {
          background: ${colors.DP00};
          background-size: 100%;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};
