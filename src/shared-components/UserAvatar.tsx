import { FC } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { UserLight } from "../users/models/User";
import { PageLink } from "./PageLink";

type Props = {
  user: UserLight;
  size?: number;
  hideNickname?: boolean;
};

export const UserAvatar: FC<Props> = ({ user, hideNickname, size }) => {
  const { colors } = useTheme();

  return (
    <>
      <PageLink href={`/users/${user.steamId}`}>
        <div className="user">
          <img src={user.avatar} />{" "}
          {!hideNickname && (
            <span className="user-nickname">{user.nickname}</span>
          )}
        </div>
      </PageLink>
      <style jsx>{`
        .user {
          display: flex;
          align-items: center;
        }

        .user img {
          width: ${size || 36}px;
          height: ${size || 36}px;
          border-radius: 50%;
          margin-right: ${hideNickname ? 0 : 8}px;
          border: 1px solid ${colors.BORDER};
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
