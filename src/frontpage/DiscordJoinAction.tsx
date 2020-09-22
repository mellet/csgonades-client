import { FC } from "react";
import { FaDiscord } from "react-icons/fa";

export const DiscordJoinAction: FC = () => {
  return (
    <>
      <div className="actions-wrapper">
        <a
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
          margin-top: 10px;
        }

        .action {
          display: flex;
          padding: 10px 20px;
          color: white;
          justify-content: space-between;
          align-items: center;
          background: #7289da;
        }

        .action:hover {
          background: #6276bd;
        }

        .discord-msg {
          font-size: 18px;
        }

        .discord {
          position: relative;
        }

        .discord-logo {
          font-size: 40px;
          opacity: 0.2;
          color: #fff;
        }
      `}</style>
    </>
  );
};
