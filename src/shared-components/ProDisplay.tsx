import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Popup } from "semantic-ui-react";

type Props = {
  size?: number;
};

export const ProDisplay: FC<Props> = ({ size = 12 }) => {
  return (
    <>
      <Popup
        inverted
        openOnTriggerClick={false}
        position="top center"
        size="mini"
        content={
          <div className="center">
            <b>Verified Pro</b>
            <br />
            Nade has been thrown by a
            <br />
            professional CS:GO player
            <br />
            in a official game.
          </div>
        }
        trigger={
          <div className="pro-icon">
            <div className="white-bg" />
            <div className="icon">
              <FaCheckCircle />
            </div>
          </div>
        }
      />
      <style jsx>{`
        .pro-icon {
          position: relative;
          color: #00b8d9;
          font-size: ${size}px;
          height: ${size}px;
          width: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon {
          z-index: 2;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }

        .white-bg {
          width: 90%;
          height: 90%;
          background: white;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
