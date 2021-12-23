import Link from "next/link";
import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { NadeCommentAvatar } from "../../nade/components/comments/NadeCommentItem/NadeCommentAvatar";
import { RenderMarkdown } from "../../nade/components/RenderMarkdown";
import { NadeComment } from "../../nade/data/NadeCommentApi";

type Props = {
  comment: NadeComment;
};

export const AdminCommentItem: FC<Props> = ({ comment }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="admin-nade-comment">
        <div className="body">
          <div className="user">
            <NadeCommentAvatar src={comment.avatar} />{" "}
            <span className="nickname">{comment.nickname}</span>
          </div>
          <div className="message">
            <RenderMarkdown value={comment.message} />
          </div>
        </div>
        <div className="link">
          <Link href={`/nades/${comment.nadeId}`}>
            <a>
              <FaChevronRight />
            </a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .admin-nade-comment {
          display: flex;
          background: ${colors.DP01};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS}px;
          padding: ${Dimensions.GUTTER_SIZE}px;
          align-items: center;
        }

        .user {
          align-self: flex-start;
          margin-right: 10px;
        }

        .body {
          flex: 1;
        }

        .user {
          margin-bottom: 10px;
          font-weight: 400;
          display: flex;
          align-items: center;
          margin-top: -8px;
        }

        .nickname {
          font-size: 16px;
          line-height: 16px;
          padding-top: 8px;
        }
      `}</style>
    </>
  );
};
