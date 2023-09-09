import { FC } from "react";
import { generateNadeItemTitle } from "../../../utils/Common";
import { useIsAdmin } from "../../../core/authentication/useIsAdmin";
import { NadeLight } from "../../../nade/models/NadePartial";

type Props = {
  nade: NadeLight;
};

export const EloGameNadeTitle: FC<Props> = ({ nade }) => {
  const isAdmin = useIsAdmin();
  return (
    <>
      <div className="battle-royal-title">
        {isAdmin && <div className="elo-score">{nade.eloScore}</div>}
        {generateNadeItemTitle(
          nade.startPosition,
          nade.endPosition,
          nade.type,
          nade.oneWay
        )}
      </div>
      <style jsx>{`
        .battle-royal-title {
          position: relative;
          font-size: 22px;
          padding: 10px 20px;
          text-align: center;
        }

        .elo-score {
          position: absolute;
          top: 5px;
          right: 5px;
          color: maroon;
          font-size: 16px;
          opacity: 0.25;
        }
      `}</style>
    </>
  );
};
