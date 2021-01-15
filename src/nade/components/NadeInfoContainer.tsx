import { FC } from "react";
import { Nade } from "../models/Nade";
import { NadeInfo } from "./NadeInfo";

type Props = {
  nade: Nade;
};

export const NadeInfoContainer: FC<Props> = ({ nade }) => {
  return (
    <>
      <div className="nade-info">
        <div className="nade-info-description">
          <NadeInfo nade={nade} />
        </div>
      </div>
      <style jsx>{`
        .nade-info {
        }
      `}</style>
    </>
  );
};
