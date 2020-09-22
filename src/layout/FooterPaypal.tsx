import { FC } from "react";
import { FaPaypal } from "react-icons/fa";

export const FooterPaypal: FC = () => {
  return (
    <>
      <div className="actions-wrapper">
        <a
          href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XHPRF8RJZKBHS&item_name=CSGO+Nades&currency_code=USD&source=url"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <div className="action discord">
            <p className="discord-msg">
              Love the site?
              <br />
              <br />
              Consider supporting me on <b>PayPal</b>
            </p>

            <div className="discord-logo">
              <FaPaypal />
            </div>
          </div>
        </a>
      </div>
      <style jsx>{`
        .action {
          padding: 20px;
          color: white;
          border-radius: 5px;
          transition: transform 0.2s;
          min-height: 200px;
          background: #00659d;
          transition: background 0.1s;
          width: 200px;
        }

        .action:hover {
          background: #005380;
        }

        .discord-msg {
          margin-bottom: 10px;
          font-size: 18px;
          line-height: 28px;
        }

        .sub-msg {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .discord {
          position: relative;
        }

        .discord-logo {
          position: absolute;
          bottom: 15px;
          right: 15px;
          font-size: 50px;
          opacity: 0.2;
          color: #fff;
        }
      `}</style>
    </>
  );
};
