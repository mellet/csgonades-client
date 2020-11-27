import { FC } from "react";
import { FaPaypal } from "react-icons/fa";

export const PaypalAction: FC = () => {
  return (
    <>
      <div className="actions-wrapper">
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XHPRF8RJZKBHS&item_name=CSGO+Nades&currency_code=USD&source=url"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <div className="action">
            <div className="discord-msg">
              Donate on <b>PayPal</b>
            </div>
            <div className="discord-logo">
              <FaPaypal />
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
          background: #00659d;
        }

        .action:hover {
          background: #005685;
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
