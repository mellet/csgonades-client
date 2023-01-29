import { FC } from "react";
import { NadeMovement } from "../../models/NadeMovement";

type MovementIconProps = {
  movement: NadeMovement;
  size?: number;
};

export const MovementIcon: FC<MovementIconProps> = ({
  movement,
  size = 26,
}) => {
  return (
    <>
      <img src={`/icons/movement/${movement}.svg`} />

      <style jsx>{`
        img {
          height: ${size}px;
        }
      `}</style>
    </>
  );
};
