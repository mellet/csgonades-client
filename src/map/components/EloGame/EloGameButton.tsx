import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  onClick: () => void;
};

export const EloGameButton: FC<Props> = ({ onClick }) => {
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
          transition: background 0.1s;
          padding: 10px;
          height: 32px;
          font-size: 14px;
          font-weight: 500;
        }

        button:hover {
          cursor: pointer;
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
    </>
  );
};
