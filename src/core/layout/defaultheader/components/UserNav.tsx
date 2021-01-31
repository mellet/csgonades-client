import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { NotificationIndicator } from "../../../../notification/container/NotificationIndicator";
import { userSelector } from "../../../authentication/AuthSelectors";
import { SignInnButton } from "./SignInnButton";
import { UserDropdown } from "./UserDropdown";
import { Dimensions } from "../../../../constants/Constants";

const UserNav: FC = memo(() => {
  const user = useSelector(userSelector);

  if (!user) {
    return <SignInnButton />;
  } else {
    return (
      <>
        <div className="user-nav">
          <div id="noti-ind">
            <NotificationIndicator />
          </div>
          <UserDropdown user={user} />
        </div>
        <style jsx>{`
          .user-nav {
            align-self: center;
            display: flex;
            align-items: center;
          }

          #noti-ind {
            margin-right: ${Dimensions.GUTTER_SIZE}px;
          }

          @media only screen and (max-width: 930px) {
            #noti-ind,
            #user-new-nade {
              display: none;
            }
          }
        `}</style>
      </>
    );
  }
});

export default UserNav;
