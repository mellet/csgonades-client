import { FC, memo } from "react";
import { NotificationIndicator } from "../../../../notification/container/NotificationIndicator";
import { SignInnButton } from "./SignInnButton";
import { UserDropdown } from "./UserDropdown";
import { Dimensions } from "../../../../constants/Constants";
import { useSignedInUser } from "../../../authentication/useSignedInUser";

export const UserNav: FC = memo(() => {
  const user = useSignedInUser();

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
