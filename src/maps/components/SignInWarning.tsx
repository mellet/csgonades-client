import { FC, memo, useEffect } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { useAnalytics } from "../../utils/Analytics";
import { SignInnButton } from "../../layout/Misc/SignInnButton";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { Twemoji } from "../../common/Twemoj/Twemoji";
import { FaCheckCircle } from "react-icons/fa";

export const SignInWarning: FC = memo(() => {
  const { signInWarning, clearSignInWarning } = useSignInWarning();
  const { event } = useAnalytics();

  useEffect(() => {
    if (signInWarning) {
      event({
        category: `Sign In Warning ${signInWarning}`,
        action: "Displayed",
      });
    }
  }, [signInWarning, event]);

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
        title="Woopsy doopsy!"
        visible={!!signInWarning}
        onDismiss={onDismiss}
      >
        <div className="sign-in-warning">
          <div className="section">
            I see you&apos;re not signed in <Twemoji emoji="😥" />
            <br />
            By signing in you can:
          </div>
          {signInWarning === "filterpro" && (
            <div className="section">
              <span className="check">
                <FaCheckCircle />
              </span>{" "}
              Filter proffesional nades
            </div>
          )}
          <div className="section">
            <Twemoji emoji="👍" /> Up and Down vote nades
          </div>
          <div className="section">
            <Twemoji emoji="🤩" /> Favorite nades
          </div>
          <div className="section">
            <Twemoji emoji="🧐" /> Comment on nades
          </div>
          <div className="section">
            <Twemoji emoji="🤤" /> Filter nades by your favorite ones
          </div>
          {signInWarning !== "filterpro" && (
            <div className="section">
              <span className="check">
                <FaCheckCircle />
              </span>{" "}
              Filter proffesional nades
            </div>
          )}

          <div className="msg">
            So what are you waiting for? <Twemoji emoji="👊" />
          </div>

          <div className="btn" onClick={onSignIn}>
            <SignInnButton />
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .check {
          color: #00b8d9;
          position: relative;
          top: 2px;
        }

        .sign-in-warning {
          padding: 30px;
          min-width: 30vw;
        }

        .msg {
          text-align: center;
          padding: 20px;
        }

        .btn {
          display: flex;
          justify-content: space-around;
        }

        .section {
          margin-bottom: 10px;
        }

        .btn {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
});
