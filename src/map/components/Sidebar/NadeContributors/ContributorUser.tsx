import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { UserAvatar } from "../../../../shared-components/UserAvatar";
import { UserLight } from "../../../../users/models/User";

type Props = {
  user: UserLight;
};

export const ContributorUser: FC<Props> = ({ user }) => {
  return (
    <>
      <Popup
        position="top center"
        content={user.nickname}
        size="mini"
        inverted
        trigger={
          <div className="contributor-wrap">
            <UserAvatar user={user} hideNickname size={28} />
          </div>
        }
      />

      <style jsx>{`
        .contributor-wrap {
          display: flex;
          margin: 3px;
        }
      `}</style>
    </>
  );
};
