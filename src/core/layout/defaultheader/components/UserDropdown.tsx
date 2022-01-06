import { FC } from "react";
import { User } from "../../../../users/models/User";
import { useSignOut } from "../../../authentication/useSignOut";
import { useRouter } from "next/router";
import { UserDropdownView } from "./UserDropdown/UserDropdownView";

type Props = {
  user: User;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const router = useRouter();
  const signOut = useSignOut();

  function onDashboardClick() {
    router.push("/dashboard", "/dashboard");
  }

  function onProfileClick() {
    router.push("/users/[user]", `/users/${user.steamId}`);
  }

  function onAddNade() {
    router.push("/createnade");
  }

  function onModeratorClick() {
    router.push("/admin");
  }

  return (
    <>
      <UserDropdownView
        avatar={user.avatar}
        nickname={user.nickname}
        role={user.role}
        onAddNade={onAddNade}
        onDashboardClick={onDashboardClick}
        onModeratorClick={onModeratorClick}
        onProfileClick={onProfileClick}
        onSignOut={signOut}
      />
    </>
  );
};
