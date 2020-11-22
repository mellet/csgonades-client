import { FC } from "react";
import { User } from "../../models/User";
import { useSignOut } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";

type Props = {
  user: User;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const router = useRouter();
  const { colors } = useTheme();
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

  return (
    <>
      <div className="user-nav-user">
        <span className="user-link">
          {user.avatar && (
            <img
              className="user-avatar"
              src={user.avatar}
              alt={`avatar for ${user.nickname}`}
            />
          )}
          <div>
            <Dropdown text={user.nickname} direction="left">
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="plus"
                  text="Add Nade"
                  onClick={onAddNade}
                />
                <Dropdown.Item
                  icon="dashboard"
                  text="Dashboard"
                  onClick={onDashboardClick}
                />
                <Dropdown.Item
                  icon="user"
                  text="Profile"
                  onClick={onProfileClick}
                />
                <Dropdown.Divider />
                <Dropdown.Item
                  icon="sign-out"
                  text="Sign out"
                  onClick={signOut}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </span>
      </div>
      <style jsx>{`
        .user-nav-user {
          display: flex;
          align-self: center;
          align-items: center;
        }

        .user-avatar {
          align-self: center;
          width: 20px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .user-link {
          display flex;
          align-items: center;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
