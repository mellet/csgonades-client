import { FC } from "react";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { NadeReportButton } from "../components/NadeActions/NadeReportButton";
import { NadeEditButton } from "../components/NadeEditButton";
import { Nade } from "../models/Nade";

type Props = { nade: Nade };

export const NadeActions: FC<Props> = ({ nade }) => {
  return (
    <>
      <FavoriteButton nadeId={nade.id} favoriteCount={nade.favoriteCount} />
      <NadeReportButton nadeId={nade.id} />
      <NadeEditButton nade={nade} />
    </>
  );
};
