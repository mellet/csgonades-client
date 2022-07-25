import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { UserLight } from "../users/models/User";
import { PageLink } from "./PageLink";

type Props = {
  user: UserLight;
  size?: number;
  hideNickname?: boolean;
  disableLink?: boolean;
};

export const UserAvatar: FC<Props> = ({
  user,
  hideNickname,
  size,
  disableLink,
}) => {
  const { colors } = useTheme();

  const [imageError, setImageError] = useState<string>();

  const userLetter = useMemo(() => {
    if (!user.nickname.length) {
      return "";
    }
    return user.nickname.slice(0, 1).toUpperCase();
  }, [user.nickname]);

  function onImageError() {
    setImageError("Failed");
  }

  function content() {
    return (
      <>
        <div className="user">
          <span className="avatar-wrap">
            {!imageError && (
              <Image
                unoptimized
                src={user.avatar}
                alt={`avatar for ${user.nickname}`}
                onError={onImageError}
                width={size || 36}
                height={size || 36}
              />
            )}
            {imageError && <span className="user-letter">{userLetter}</span>}
          </span>
          {!hideNickname && <p className="user-nickname">{user.nickname}</p>}
        </div>
        <style jsx>{`
          .user {
            display: flex;
            align-items: center;
          }

          .avatar-wrap {
            border: 2px solid ${colors.BORDER};
            border-radius: 50%;
            width: ${size || 36}px;
            height: ${size || 36}px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${imageError ? colors.PRIMARY : "transparent"};
            margin-right: ${hideNickname ? 0 : 8}px;
            opacity: ${disableLink ? 1 : 0.9};
            transition: all 0.15s;
          }

          .avatar-wrap:hover {
            opacity: 1;
            border: 2px solid ${disableLink ? colors.BORDER : colors.linkHover};
          }

          .avatar-wrap img {
            width: 100%;
          }

          .user-nickname {
            color: ${colors.TEXT};
            font-weight: 400;
            font-size: 18px;
          }

          .user-letter {
            font-weight: 500;
            color: #fff;
            font-size: 14px;
            transition: all 0.2s;
          }
        `}</style>
      </>
    );
  }

  if (disableLink) {
    return content();
  }

  return (
    <>
      <PageLink href={`/users/${user.steamId}`}>{content()}</PageLink>
    </>
  );
};
