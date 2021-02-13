import Router from "next/router";
import { FC, useState } from "react";
import { User } from "../models/User";
import { useTheme } from "../../core/settings/SettingsHooks";
import { useFinishProfile } from "../data/useFinishProfile";
import { Dimensions } from "../../constants/Constants";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { useGa } from "../../utils/Analytics";

type Props = { user: User };

export const UserFinishProfilePage: FC<Props> = ({ user }) => {
  const ga = useGa();
  const [loading, setLoading] = useState(false);
  const finishProfile = useFinishProfile();
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState<string | undefined>();
  const { colors } = useTheme();
  const displayToast = useDisplayToast();

  function onSubmit() {
    if (nickname.includes("@")) {
      setError(
        "It looks like you put your e-mail as your nickname. This is not very smart as it will be visible to anyone."
      );
      ga.error("profile_create_wrong_email");
      return;
    }

    setLoading(true);
    finishProfile(user.steamId, {
      nickname,
      email,
      bio,
    });
    ga.event({
      category: "auth",
      action: "finished_profile_creation",
    });
    displayToast({
      severity: "success",
      message: "Your profile is ready!",
      title: "All set!",
      durationSeconds: 30,
    });
    Router.push("/");
  }

  return (
    <>
      <div className="wrap">
        <div className="finish-profile-wrap">
          <div className="finish-profile">
            <div className="welcome">
              <h1>Hi {user.nickname}, let&apos;s finish your profile!</h1>
              <h2>Then go favorite some nades or add your own 👊</h2>
            </div>
          </div>
          {!!error && (
            <div className="error">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          )}
          <div className="profile-form">
            <span className="label">
              Nickname <span className="require">*</span>
            </span>
            <input
              value={nickname}
              placeholder="Nickname"
              onChange={(e) => setNickname(e.target.value)}
            />
            <span className="label">E-mail</span>
            <input
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="label">Bio</span>
            <textarea
              value={bio}
              placeholder="Write something funny... Or keep it blank if your mysterious."
              onChange={(e) => setBio(e.target.value)}
              rows={5}
            />
            <button disabled={loading} className="save-btn" onClick={onSubmit}>
              SAVE
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .wrap {
          background: ${colors.DP00};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .finish-profile-wrap {
          background: ${colors.DP02};
          margin: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .finish-profile {
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .welcome {
          color: ${colors.TEXT};
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .welcome h1 {
          font-size: 24px;
          margin: 0;
          padding: 0;
        }

        .welcome h2 {
          font-size: 18px;
          margin: 0;
          padding: 0;
        }

        .error {
          background: #800d0d;
          color: white;
          max-width: 400px;
          margin: 30px auto;
          padding: 20px;
          border-radius: 5px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          padding: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP01};
        }

        .label {
          margin-bottom: 5px;
          font-size: 18px;
          color: ${colors.TEXT};
        }

        .require {
          color: maroon;
        }

        input,
        textarea {
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border: 1px solid ${colors.BORDER};
          padding: 15px;
          font-size: 16px;
          font-weight: 300;
          outline: none;
          border-radius: 5px;
          background: transparent;
          color: ${colors.TEXT};
        }

        .save-btn {
          border: none;
          outline: none;
          cursor: pointer;
          padding: 15px 20px;
          background: ${colors.PRIMARY};
          color: white;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
