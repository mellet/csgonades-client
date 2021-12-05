import { User } from "./models/User";
import { UserNotFound } from "./views/UserNotFound";
import { UserUI } from "./views/UserUI";

type Props = {
  user: User | null;
};

export const UserMain: React.FC<Props> = ({ user }) => {
  return (
    <>
      {!user && <UserNotFound />}
      {user && <UserUI user={user} />}
    </>
  );
};
