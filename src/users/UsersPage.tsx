import { User } from "../models/User";
import { UserNotFound } from "./UserNotFound";
import { UserUI } from "./UserUI";

type Props = {
  user: User | null;
};

export const UserPage: React.FC<Props> = ({ user }) => {
  return (
    <>
      {!user && <UserNotFound />}
      {user && <UserUI user={user} />}
    </>
  );
};
