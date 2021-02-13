import { FC } from "react";
import { FaDiscord } from "react-icons/fa";
import { useGa } from "../../../utils/Analytics";

export const DiscordJoinAction: FC = () => {
  const ga = useGa();

  function logJoinDiscor() {
    ga.event({ category: "map-page", action: "Click Join Discord" });
  }

  return (
    <>
      <div className="actions-wrapper">
        <a
          onClick={logJoinDiscor}
          href="https://discord.gg/010h0KFCBNASyMUKv"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <div className="action">
            <div className="discord-msg">
              Join us on <b>Discord</b>
            </div>
            <div className="discord-logo">
              <FaDiscord />
            </div>
          </div>
        </a>
      </div>
      <style jsx>{`
        .actions-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .action {
          display: flex;
          padding: 10px 16px;
          color: white;
          justify-content: space-between;
          align-items: center;
          background: #7289da;
        }

        .action:hover {
          background: #6276bd;
        }

        .discord-msg {
          font-size: 16px;
        }

        .discord {
          position: relative;
        }

        .discord-logo {
          font-size: 30px;
          opacity: 0.2;
          color: #fff;
        }
      `}</style>
    </>
  );
};
