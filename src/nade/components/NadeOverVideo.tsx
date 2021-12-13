import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { UserAvatar } from "../../shared-components/UserAvatar";
import { Nade } from "../models/Nade";
import { Spacer } from "../../shared-components/Spacer";
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
        <Spacer>
          <FavoriteButton nadeId={nade.id} favoriteCount={nade.favoriteCount} />
          <NadeReportButton nadeId={nade.id} />
          <NadeEditButton
            nadeId={nade.id}
            nadeSteamId={nade.steamId}
            nadeSlug={nade.slug}
          />
        </Spacer>
      </div>
      <style jsx>{`
        #over-video {
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </>
  );
};
