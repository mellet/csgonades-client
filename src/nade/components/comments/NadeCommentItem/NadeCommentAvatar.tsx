import { FC } from "react";
import { UserAvatar } from "../../../../shared-components/UserAvatar";
import { UserLight } from "../../../../users/models/User";

type Props = {
  user: UserLight;
};

export const NadeCommentAvatar: FC<Props> = ({ user }) => {
  return (
    <>
      <div className="nade-comment-avatar">
        <UserAvatar hideNickname user={user} size={36} />
      </div>
      <style jsx>{`
        .nade-comment-avatar {
          grid-area: avatar;
          margin-right: 12px;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
};
