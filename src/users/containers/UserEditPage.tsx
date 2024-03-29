import { FC } from "react";
import { useIsAdminOrModerator } from "../../core/authentication/useIsAdminOrModerator";
import { useSignedInUser } from "../../core/authentication/useSignedInUser";
import { ForbiddenWarning } from "../../shared-components/ForbiddenWarning";
import { User } from "../models/User";
import { UserPanel } from "../views/UserPanel";
import { UserEditMain } from "../views/UserEditMain";
import { UserPageLayout } from "../views/UserPageLayout";

type Props = {
  user: User;
};

export const UserEditPage: FC<Props> = ({ user }) => {
  const isSelf = useIsSelf(user);
  const isAdminOrModerator = useIsAdminOrModerator();

  if (!isSelf && !isAdminOrModerator) {
    return <ForbiddenWarning />;
  }

  return (
    <UserPageLayout
      main={<UserEditMain user={user} />}
      panel={<UserPanel user={user} />}
    />
  );
};

function useIsSelf(user: User) {
  const { signedInUser } = useSignedInUser();

  if (!signedInUser) {
    return false;
  }

  return signedInUser.steamId === user.steamId;
}
