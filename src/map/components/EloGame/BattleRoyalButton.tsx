import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  onClick: () => void;
};

export const BattleRoyalButton: FC<Props> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>Nade Battle Royal 🎲</button>
      <style jsx>{`
        button {
          border: none;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          outline: none;
          background: rgba(255, 255, 255, 0.75);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.1s;
          padding: 10px;
          height: 32px;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.9;
          background: rgb(255, 254, 0);
          background: linear-gradient(
            90deg,
            rgba(255, 254, 0, 1) 0%,
            rgba(255, 194, 0, 1) 50%
          );
        }

        button:hover {
          cursor: pointer;
          opacity: 1;
        }
      `}</style>
    </>
  );
};
