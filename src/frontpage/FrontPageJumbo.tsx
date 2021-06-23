import { FC, memo } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { SiteStats } from "../core/api/StatsApi";
import { kFormatter } from "../utils/Common";
import { NadeIcon } from "../shared-components/nade-icons";
import { FaUserFriends } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";

type Props = {
  stats: SiteStats | null;
};

export const FrontPageJumbo: FC<Props> = memo(({ stats }) => {
  const { colors } = useTheme();

  return (
    <>
      <div id="jumbo">
        <div id="message">
          <h1>
            Welcome to CSGO Nades.
            <br /> A community to learn and share
            <br /> nades for Counter-Strike Global Offensive.
          </h1>
        </div>
        <div id="jumbo-ill">
          <img src="/images/ilustration.svg" />
        </div>

        {stats && (
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">
                <NadeIcon nadeType="smoke" />
              </span>
              <span className="stat-count">{stats.numSmokes}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">
                <NadeIcon nadeType="flash" />
              </span>
              <span className="stat-count">{stats.numFlashes}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">
                <NadeIcon nadeType="molotov" />
              </span>
              <span className="stat-count">{stats.numMolotovs}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">
                <NadeIcon nadeType="hegrenade" />
              </span>
              <span className="stat-count">{stats.numGrenades}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">
                <FaUserFriends size={24} />
              </span>
              <span className="stat-count">{kFormatter(stats.numUsers)}</span>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        #jumbo {
          display: grid;
          grid-template-columns: 1fr 1fr 300px;
          grid-template-areas:
            "msg msg ill"
            "stats stats stats";
          background: linear-gradient(
            252.84deg,
            ${colors.DP00} 40%,
            ${colors.DP01} 70%
          );
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          margin-bottom: 30px;
          border-radius: 5px;
          overflow: hidden;
        }

        #message {
          grid-area: msg;
          padding: 50px 30px;
          color: ${colors.TEXT};
        }

        #message p {
          font-size: 1.3rem;
        }

        #message a {
          color: ${colors.TEXT};
        }

        #message a:hover {
          text-decoration: underline;
        }

        h1 {
          color: ${colors.TEXT};
          margin: 0;
          padding: 0;
          font-weight: 300;
          font-size: 2.2rem;
          margin-bottom: 20px;
        }

        #jumbo-ill {
          grid-area: ill;
          height: 200px;
          width: 300px;
          overflow: hidden;
          align-self: flex-end;
          padding-right: 30px;
          padding-top: 30px;
        }

        #jumbo-ill img {
          width: 100%;
          display: block;
        }

        .stats {
          grid-area: stats;
          display: flex;
          justify-content: center;
          background: ${colors.DP02};
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px 12px;
          background: ${colors.DP01};
          padding: 6px 10px;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }

        .stat-count {
          font-size: 18px;
          font-weight: 400;
          background: ${colors.DP01};
          color: ${colors.TEXT};
        }

        .stat-label {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 4px;
        }

        @media only screen and (max-width: 600px) {
          #jumbo {
            display: grid;
            grid-template-columns: 1fr 1fr 300px;
            grid-template-areas:
              "msg msg msg"
              ". . ill"
              "stats stats stats";
            background: linear-gradient(
              252.84deg,
              ${colors.jumboGradientStart} 33.44%,
              ${colors.jumboGradientEnd} 66.89%
            );
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            margin-bottom: 30px;
            border-radius: 5px;
          }

          .stat-item {
            margin: 8px;
          }

          .stat-count {
            font-size: 16px;
          }
        }
      `}</style>
      <style jsx global>{`
        .tihi {
          font-size: 2em;
        }
      `}</style>
    </>
  );
});
