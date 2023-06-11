import { FC } from "react";
import { Dropdown } from "semantic-ui-react";
import { Role } from "../../../../../users/models/User";
import { useTheme } from "../../../../settings/useTheme";

export type UserDropdownViewProps = {
  avatar: string;
  nickname: string;
  role: Role;
  onDashboardClick: () => void;
  onProfileClick: () => void;
  onAddNade: () => void;
  onModeratorClick: () => void;
  onSignOut: () => void;
};

export const UserDropdownView: FC<UserDropdownViewProps> = ({
  avatar,
  nickname,
  role,
  onAddNade,
  onDashboardClick,
  onModeratorClick,
  onProfileClick,
  onSignOut,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="user-nav-user">
        <span className="user-link">
          {avatar && (
            <img
              className="user-avatar"
              src={avatar}
              alt={`avatar for ${nickname}`}
            />
          )}
          <Dropdown text={nickname} direction="left">
            <Dropdown.Menu>
              <Dropdown.Item icon="plus" text="Add Nade" onClick={onAddNade} />
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
              {role !== "user" && (
                <Dropdown.Item
                  icon="dashboard"
                  text="Moderator"
                  onClick={onModeratorClick}
                />
              )}
              <Dropdown.Divider />
              <Dropdown.Item
                icon="sign-out"
                text="Sign out"
                onClick={onSignOut}
              />
            </Dropdown.Menu>
          </Dropdown>
        </span>
      </div>
      <style jsx>{`
        .user-nav-user {
          display: flex;
          align-self: center;
          align-items: center;
        }

        .user-avatar {
          display: inline-block;
          align-self: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .user-link {
          display: flex;
          align-items: center;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
