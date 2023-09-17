import { FC } from "react";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  name?: string;
  avatarUrl?: string;
};

export const BlogAuthor: FC<Props> = ({ avatarUrl, name }) => {
  const { colors } = useTheme();
  const defaultName = name || "Mellet Solbakk";
  const defaultAvatar = avatarUrl || "/mellet.jpeg";

  return (
    <>
      <div className="author">
        <img src={defaultAvatar} />
        <div className="author-details">
          <span>WRITTEN BY</span>
          <p>{defaultName}</p>
        </div>
      </div>
      <style jsx>{`
        .author {
          background: ${colors.DP02};
          border-radius: 5px;
          display: flex;
          margin-top: 100px;
          padding: 20px;
        }

        .author img {
          border-radius: 50%;
          height: 60px;
          margin-right: 20px;
          width: 60px;
        }

        .author-details span {
          color: #bbb;
          display: block;
          font-size: 16px;
          margin-bottom: 6px;
        }

        .author-details p {
          font-size: 18px;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};
