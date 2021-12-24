import { User } from "./models/User";
import { UserPanel } from "./views/UserDetails";
import { UserNotFound } from "./views/UserNotFound";
import { UserPageLayout } from "./views/UserPageLayout";
import { UserUI } from "./views/UserUI";

type Props = {
  user: User | null;
};

export const UserMain: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <UserNotFound />;
  }

  return (
    <>
      <UserPageLayout
        main={<UserUI user={user} />}
        panel={<UserPanel user={user} />}
      />
    </>
  );
};
