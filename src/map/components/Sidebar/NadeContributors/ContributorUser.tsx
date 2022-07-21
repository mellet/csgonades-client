import Link from "next/link";
import { FC, useMemo, useState } from "react";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { UserContributor } from "./UserContributor";

type Props = {
  user: UserContributor;
};

export const ContributorUser: FC<Props> = ({ user }) => {
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

  return (
    <>
      <Popup
        position="top center"
        content={user.nickname}
        size="mini"
        inverted
        trigger={
          <div className="contributor-wrap">
            <Link href={`/users/${user.steamId}`}>
              <a className="contributor">
                {!imageError && (
                  <img src={user.avatar} onError={onImageError} />
                )}
                {imageError && (
                  <span className="user-letter">{userLetter}</span>
                )}
              </a>
            </Link>
          </div>
        }
      />

      <style jsx>{`
        .contributor-wrap {
          display: flex;
        }

        .contributor {
          display: flex;
          margin: 3px;
          height: 28px;
          width: 28px;
          border: 2px solid ${colors.DP00};
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${colors.PRIMARY};
        }

        .contributor img {
          width: 100%;
        }

        .user-letter {
          font-weight: 500;
          color: #fff;
          font-size: 14px;
        }

        .nickname {
          display: block;
          padding-left: 5px;
          padding-right: 15px;
          font-size: 12px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};
