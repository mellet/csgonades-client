import { FC } from "react";

type Props = {
  message: string;
  direction: "top" | "left" | "bottom" | "right";
};

export const Tooltip: FC<Props> = ({ message, children }) => {
  return (
    <>
      <div className="tooltip">
        {children}
        <span className="tooltiptext">{message}</span>
      </div>
      <style jsx>{`
        .tooltip {
          position: relative;
          display: inline-block;
        }

        /* Tooltip text */
        .tooltip .tooltiptext {
          visibility: hidden;
          background-color: rgba(0, 0, 0, 0.9);
          color: #fff;
          text-align: center;
          padding: 2px;
          border-radius: 8px;
          position: absolute;
          font-size: 11px;
          z-index: 1;
          width: 60px;
          top: 110%;
          left: 50%;
          margin-left: -30px;
          transform: translateY(0);
          opacity: 0;
          transition: all 0.3s;
        }

        /* Show the tooltip text when you mouse over the tooltip container */
        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
          transform: translateY(5px);
        }

        .tooltip .tooltiptext::after {
          content: " ";
          position: absolute;
          bottom: 100%; /* At the top of the tooltip */
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent rgba(0, 0, 0, 0.9) transparent;
        }
      `}</style>
    </>
  );
};
