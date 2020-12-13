import { FC, memo } from "react";
import { CSGNModal } from "../common/CSGNModal";
import { useAnalytics } from "../utils/Analytics";
import { SignInnButton } from "../defaultheader/components/SignInnButton";
import { useSignInWarning } from "../store/GlobalStore/hooks/useSignInWarning";
import { FaCheckCircle, FaComment, FaPlus, FaStar } from "react-icons/fa";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../constants/Constants";

export const SignInWarning: FC = memo(() => {
  const { colors } = useTheme();
  const { signInWarning, clearSignInWarning } = useSignInWarning();
  const { event } = useAnalytics();

  function onSignIn() {
    event({
      category: `Sign In Warning ${signInWarning}`,
      action: "Sign In Clicked",
    });
  }

  function onDismiss() {
    clearSignInWarning();
    event({
      category: `Sign In Warning ${signInWarning}`,
      action: "Dismiss",
    });
  }

  return (
    <>
      <CSGNModal
        title="Sign In Required"
        visible={!!signInWarning}
        onDismiss={onDismiss}
      >
        <div className="sign-in-warning">
          <div className="section">Sign in and you can...</div>

          <div className="section">
            <span className="fa-icon plus">
              <FaPlus />
            </span>
            Add new nades
          </div>
          <div className="section">
            <span className="fa-icon star">
              <FaStar />
            </span>
            Favorite nades
          </div>
          <div className="section">
            <span className="fa-icon comment">
              <FaComment />
            </span>
            Comment on nades
          </div>
          <div className="section">
            <span className="fa-icon check">
              <FaCheckCircle />
            </span>
            Filter proffesional nades
          </div>
          <div className="btn" onClick={onSignIn}>
            <SignInnButton />
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .sign-in-warning {
          padding: ${Dimensions.GUTTER_SIZE}px;
          min-width: 250px;
        }

        .fa-icon {
          position: relative;
          top: 2px;
          min-width: 24px;
          display: inline-block;
        }

        .check {
          color: #00b8d9;
        }

        .plus {
          color: ${colors.SUCCESS};
        }

        .star {
          color: ${colors.FAV_YELLOW};
        }

        .comment {
          color: ${colors.GREY};
        }

        .msg {
          text-align: center;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .btn {
          display: flex;
          justify-content: space-around;
        }

        .section {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
});
