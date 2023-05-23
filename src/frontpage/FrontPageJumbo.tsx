import { FC, memo } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { SiteStats } from "../core/api/StatsApi";
import { kFormatter } from "../utils/Common";
import { NadeIcon } from "../shared-components/nade-icons";
import { FaUserFriends } from "react-icons/fa";
import { FrontPageMapSelector } from "./FrontPageMapSelector";

type Props = {
  stats: SiteStats | null;
};

export const FrontPageJumbo: FC<Props> = memo(({ stats }) => {
  const { colors } = useTheme();

  return (
    <>
      <div id="jumbo">
        <div id="message">
          <h1>Welcome to CSGO Nades</h1>
          <p className="welcome-msg">
            Discover, learn, and share nades for Counter-Strike Global Offensive
            with our engaging gaming community.
          </p>
          <p className="welcome-mini">
            Welcome to our thriving gaming community dedicated to Counter-Strike
            Global Offensive! We provide an interactive platform where you can
            explore, acquire knowledge, and exchange strategies for nade
            throwing. Join us to enhance your gameplay and connect with fellow
            CS:GO enthusiasts!
          </p>
        </div>
        <div id="jumbo-ill">
          <img src="/images/ilustration.svg" />
        </div>

        {stats && (
          <div className="stats">
            <div className="stat-item">
              <FrontPageMapSelector nadeType="smoke">
                <span className="stat-label">
                  <NadeIcon nadeType="smoke" size={30} />
                </span>
              </FrontPageMapSelector>

              <span className="stat-count">{stats.numSmokes}</span>
            </div>
            <div className="stat-item">
              <FrontPageMapSelector nadeType="flash">
                <span className="stat-label">
                  <NadeIcon nadeType="flash" />
                </span>
              </FrontPageMapSelector>

              <span className="stat-count">{stats.numFlashes}</span>
            </div>
            <div className="stat-item">
              <FrontPageMapSelector nadeType="molotov">
                <span className="stat-label">
                  <NadeIcon nadeType="molotov" />
                </span>
              </FrontPageMapSelector>
              <span className="stat-count">{stats.numMolotovs}</span>
            </div>
            <div className="stat-item">
              <FrontPageMapSelector nadeType="hegrenade">
                <span className="stat-label">
                  <NadeIcon nadeType="hegrenade" />
                </span>
              </FrontPageMapSelector>
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
        }

        #message {
          grid-area: msg;
          padding: 40px 30px;
          color: ${colors.TEXT};
          max-width: 800px;
        }

        #message h1 {
          color: ${colors.TEXT};
          margin: 0;
          padding: 0;
          font-weight: 300;
          font-size: 2.2rem;
          margin-bottom: 12px;
        }

        #message .welcome-msg {
          font-size: 1.6rem;
        }

        .welcome-mini {
          font-size: 1.3rem;
        }

        #jumbo-ill {
          grid-area: ill;
          height: 220px;
          width: 350px;
          overflow: hidden;
          align-self: flex-end;
          padding-right: 70px;
          padding-top: 30px;
        }

        #jumbo-ill img {
          width: 100%;
          display: block;
        }

        .stats {
          grid-area: stats;
          display: flex;
          justify-content: space-between;
          background: ${colors.DP02};
        }

        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px 0px;
          border-right: 1px solid ${colors.BORDER};
          margin-top: 14px;
          margin-bottom: 14px;
        }

        .stat-item:last-child {
          border-right: none;
        }

        .stat-count {
          font-size: 14px;
          font-weight: 400;
          color: ${colors.TEXT};
          font-weight: 400;
        }

        .stat-label {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-bottom: 2px;
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
