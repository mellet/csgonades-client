import { FC } from "react";
import { NadeLight } from "../../../nade/models/NadeLight";
import { generateNadeItemTitle } from "../../../utils/Common";

type Props = {
  nade: NadeLight;
};

export const EloGameNadeTitle: FC<Props> = ({ nade }) => {
  return (
    <>
      <div>
        {generateNadeItemTitle(
          nade.startPosition,
          nade.endPosition,
          nade.type,
          nade.oneWay,
          nade.map
        )}
      </div>
      <style jsx>{`
        div {
          font-size: 22px;
          padding: 10px 20px;
          text-align: center;
        }
      `}</style>
    </>
  );
};
