import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { UserAvatar } from "../../shared-components/UserAvatar";
import { Nade } from "../models/Nade";
import { NadeReportButton } from "./NadeActions/NadeReportButton";
import { NadeEditButton } from "./NadeEditButton";

type Props = {
  nade: Nade;
};

export const NadeOverVideo: FC<Props> = ({ nade }) => {
  return (
    <>
      <div id="over-video">
        <UserAvatar user={nade.user} />
        <div id="actions">
          <FavoriteButton nadeId={nade.id} favoriteCount={nade.favoriteCount} />
          <NadeReportButton nadeId={nade.id} />
          <NadeEditButton nade={nade} />
        </div>
      </div>
      <style jsx>{`
        #over-video {
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        #actions {
          display: flex;
        }

        .spacer {
          width: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
