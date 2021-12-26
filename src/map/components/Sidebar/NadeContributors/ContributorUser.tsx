import Link from "next/link";
import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { UserContributor } from "./UserContributor";

type Props = {
  user: UserContributor;
};

export const ContributorUser: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
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
                <img src={user.avatar} />
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
        }

        .contributor img {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          border: 1px solid ${colors.DARK_BORDER};
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
