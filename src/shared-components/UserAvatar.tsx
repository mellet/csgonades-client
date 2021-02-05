import { FC } from "react";
import { useTheme } from "styled-components";
import { UserLight } from "../users/models/User";
import { PageLink } from "./PageLink";

type Props = {
  user: UserLight;
};

export const UserAvatar: FC<Props> = ({ user }) => {
  const { colors } = useTheme();

  return (
    <>
      <PageLink href={`/users/[user]`} as={`/users/${user.steamId}`}>
        <div className="user">
          <img src={user.avatar} />{" "}
          <span className="user-nickname">{user.nickname}</span>
        </div>
      </PageLink>
      <style jsx>{`
        .user {
          display: flex;
          align-items: center;
        }

        .user img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 8px;
          border: 1px solid ${colors.DP01};
        }

        .user-nickname {
          color: ${colors.TEXT};
          font-weight: 400;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};
