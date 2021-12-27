import Router from "next/router";
import { FC, useState } from "react";
import { User } from "../models/User";
import { useTheme } from "../../core/settings/SettingsHooks";
import { useFinishProfile } from "../data/useFinishProfile";
import { Dimensions } from "../../constants/Constants";
import { useDisplayToast } from "../../core/toasts/hooks/useDisplayToast";
import { useGa } from "../../utils/Analytics";
import { TickrateSelector } from "../../nade/components/NadeInputs/TickrateSelector";

type Props = { user: User };

export const UserFinishProfilePage: FC<Props> = ({ user }) => {
  const ga = useGa();
  const [loading, setLoading] = useState(false);
  const finishProfile = useFinishProfile();
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [defaultTick, setDefaultTick] = useState(user.defaultTick);
  const [error, setError] = useState<string | undefined>();
  const { colors } = useTheme();
  const displayToast = useDisplayToast();

  function onSubmit() {
    const isValidNickname = Boolean(nickname.match("^[A-Za-z0-9]+$"));

    if (!nickname) {
      ga.error("profile_create_email_as_displayname");
      return setError("Display name is required");
    }
    if (!isValidNickname) {
      ga.error("profile_create_email_as_displayname");
      return setError("Nickname can only include letters and numbers.");
    }
    if (!email || !email.includes("@")) {
      ga.error("profile_no_email");
      return setError("E-mail is required and needs to be a valid e-mail.");
    }

    setLoading(true);
    finishProfile(user.steamId, {
      nickname,
      email,
      bio,
      defaultTick,
    });
    ga.event({
      category: "auth",
      action: "finished_profile_creation",
    });
    displayToast({
      severity: "success",
      message: "Your profile is ready!",
      title: "All set!",
    });
    Router.push("/");
  }

  return (
    <>
      <div className="background">
        <div className="finish-profile-wrap">
          <div className="finish-profile-header">
            <div className="welcome">
              <h1>Hi {user.nickname}, let&apos;s finish your profile!</h1>
              <h2>Then go favorite some nades or add your own 👊</h2>
            </div>
          </div>
          {Boolean(error) && (
            <div className="error">
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
            <span className="label">
              E-mail <span className="require">*</span>
            </span>
            <input
              value={email}
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="label">Bio</span>
            <textarea
              value={bio}
              placeholder="(Optional) Tell us about yourself."
              onChange={(e) => setBio(e.target.value)}
              rows={5}
            />
            <TickrateSelector
              label="Preferred tickrate"
              onChange={setDefaultTick}
              defaultValue={defaultTick}
              hintText="Optional: If you only play on a specific tickrate and don't care about nades for the opposite tickrate."
            />
            <br />

            <button disabled={loading} className="save-btn" onClick={onSubmit}>
              SAVE
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .background {
          background: ${colors.BORDER};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .finish-profile-wrap {
          background: ${colors.DP03};
          margin: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          max-width: 500px;
        }

        .finish-profile-header {
          background: ${colors.DP03};
          padding: ${Dimensions.GUTTER_SIZE}px;
          border-bottom: 1px solid ${colors.BORDER};
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
          background: ${colors.ERROR};
          color: white;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .error p {
          font-size: 16px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          padding: ${Dimensions.GUTTER_SIZE}px;
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
