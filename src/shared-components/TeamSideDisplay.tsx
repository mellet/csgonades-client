import { FC } from "react";
import { TeamSide } from "../nade/models/TeamSide";

type Props = {
  teamSide: TeamSide;
  size?: number;
};

export const TeamSideDisplay: FC<Props> = ({ teamSide, size = 24 }) => {
  function teamSideToolTip() {
    if (teamSide === "terrorist") {
      return "Mainly used when playin as Terrorist";
    } else if (teamSide === "counterTerrorist") {
      return "Mainly used when playin as Counter-Terrorist";
    } else {
      return "Can be used by both Terrorist and Counter-Terrorist";
    }
  }

  return (
    <>
      <div className="team-size-display" title={teamSideToolTip()}>
        <img src={`/icons/${teamSide}.webp`} />
      </div>
      <style jsx>{`
        img {
          display: inline-block;
          width: 100%;
        }

        .team-size-display {
          height: ${size}px;
          width: ${size}px;
        }
      `}</style>
    </>
  );
};
