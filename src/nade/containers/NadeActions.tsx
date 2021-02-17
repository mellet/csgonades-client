import Link from "next/link";
import { FC } from "react";
import { FavoriteButton } from "../../favorites/components/FavoriteButton";
import { NadeReportButton } from "../components/NadeActions/NadeReportButton";
import { NadeCommentButton } from "../components/NadeCommentButton";
import { NadeEditButton } from "../components/NadeEditButton";
import { Nade } from "../models/Nade";

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
      <NadeReportButton nadeId={nade.id} />
      <NadeEditButton nade={nade} />
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
