import Link from "next/link";
import { FC } from "react";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { NadeReportButton } from "../components/NadeActions/NadeReportButton";
import { NadeCommentButton } from "../components/NadeCommentButton";
import { NadeEditButton } from "../components/NadeEditButton";
import { Nade } from "../models/Nade";
import dynamic from "next/dynamic";

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
      <div className="user-avatar">
        <Link href={"/users/" + nade.user.steamId}>
          <a>
            <img src={nade.user.avatar} />
          </a>
        </Link>
      </div>
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
      <style jsx>{`
        .user-avatar img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
