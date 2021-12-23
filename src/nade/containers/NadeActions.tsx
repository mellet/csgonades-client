import { FC } from "react";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { NadeReportButton } from "../components/NadeActions/NadeReportButton";
import { NadeCommentButton } from "../components/NadeCommentButton";
import { NadeEditButton } from "../components/NadeEditButton";
import { Nade } from "../models/Nade";
import dynamic from "next/dynamic";
import { Spacer } from "../../shared-components/Spacer";
import { UserAvatar } from "../../shared-components/UserAvatar";

const NadeCopyPosition = dynamic(
  () =>
    import(
      /* webpackChunkName: "nadecopyposition" */ "../components/NadeActions/NadeCopyPosition"
    ).then((mod) => mod.NadeCopyPosition),
  { ssr: false }
);

type Props = { nade: Nade };

export const NadeActions: FC<Props> = ({ nade }) => {
  return (
    <>
      <Spacer vertical>
        <UserAvatar hideNickname user={nade.user} size={40} />
        <FavoriteButton nadeId={nade.id} favoriteCount={nade.favoriteCount} />
        <NadeCommentButton
          slug={nade.slug || nade.id}
          commentCount={nade.commentCount}
        />
        {!!nade.setPos && (
          <NadeCopyPosition setPos={nade.setPos} nadeId={nade.id} />
        )}
        <NadeReportButton nadeId={nade.id} />
        <NadeEditButton
          nadeId={nade.id}
          nadeSteamId={nade.steamId}
          nadeSlug={nade.slug}
        />
      </Spacer>
    </>
  );
};
