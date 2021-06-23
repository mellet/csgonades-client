import { FC } from "react";
import { FaDiscord } from "react-icons/fa";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";

export const DiscordJoinAction: FC = () => {
  const { colors } = useTheme();
  const ga = useGa();

  function logJoinDiscor() {
    ga.event({ category: "map_page", action: "click_join_discord" });
  }

  return (
    <>
      <a
        className="action"
        onClick={logJoinDiscor}
        href="https://discord.gg/010h0KFCBNASyMUKv"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <div className="discord-msg">
          Join us on <span>Discord</span>
        </div>
        <div className="discord-logo">
          <FaDiscord />
        </div>
      </a>
      <style jsx>{`
        .action {
          display: flex;
          padding: 10px 16px;
          color: white;
          justify-content: space-between;
          align-items: center;
          background: #7289da;
          height: 50px;
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
        }

        .action:focus-visible {
          outline: 1px auto ${colors.focusOutline};
        }

        .action:hover {
          background: #6276bd;
        }

        .discord-msg {
          font-size: 16px;
        }

        .discord-msg span {
          font-weight: 500;
        }

        .discord {
          position: relative;
        }

        .discord-logo {
          font-size: 30px;
          color: #fff;
          width: 30px;
          animation: hint 1s 4s;
        }

        @keyframes hint {
          0% {
            transform: translateX(0) scale(1);
          }

          50% {
            transform: translateX(-20%) scale(1.25);
          }
          100% {
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};
