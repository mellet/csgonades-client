import { FC } from "react";

type Props = {
  message: string;
  direction: "top" | "left" | "bottom" | "right";
};

export const Tooltip: FC<Props> = ({ message, children, direction }) => {
  const className = ["tooltip", direction].join(" ");

  return (
    <>
      <div className={className}>
        {children}
        <span className="tooltiptext">{message}</span>
      </div>
      <style jsx>{`
        .tooltip {
          position: relative;
          display: inline-block;
        }

        .tooltiptext {
          pointer-events: none;
          white-space: nowrap;
          background: pink;
        }

        /* Tooltip text */
        .tooltip .tooltiptext {
          visibility: hidden;
          background-color: rgba(0, 0, 0, 0.9);
          color: #fff;
          text-align: center;
          padding: 2px 6px;
          border-radius: 8px;
          position: absolute;
          font-size: 11px;
          z-index: 1;
          transform: translateY(0);
          opacity: 0;
          transition: all 0.3s;
        }

        .bottom .tooltiptext {
          width: 60px;
          top: 110%;
          left: 50%;
          margin-left: -30px;
        }

        .right .tooltiptext {
          top: 8px;
          left: 110%;
        }

        .right .tooltiptext::after {
          content: " ";
          position: absolute;
          top: 50%;
          right: 100%; /* To the left of the tooltip */
          margin-top: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent black transparent transparent;
        }

        /* Show the tooltip text when you mouse over the tooltip container */
        .bottom:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
          transform: translateY(5px);
        }

        .bottom .tooltiptext::after {
          content: " ";
          position: absolute;
          bottom: 100%; /* At the top of the tooltip */
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent rgba(0, 0, 0, 0.9) transparent;
        }

        .right:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
          transform: translateX(5px);
        }
      `}</style>
    </>
  );
};
