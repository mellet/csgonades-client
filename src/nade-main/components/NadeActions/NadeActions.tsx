import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { NadeReportButton } from "./NadeReportButton";
import { NadeFavoriteButton } from "./NadeFavoriteButton";

type Props = {
  nadeId: string;
};

export const NadeAction: FC<Props> = ({ nadeId }) => {
  return (
    <>
      <div className="nade-actions">
        <NadeFavoriteButton nadeId={nadeId} />
        <NadeReportButton nadeId={nadeId} />
      </div>
      <style jsx>{`
        .nade-actions {
          padding: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
        }
      `}</style>
    </>
  );
};
