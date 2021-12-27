import { FC, useCallback, useState } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { TickrateSelector } from "../../nade/components/NadeInputs/TickrateSelector";
import { CsgnSaveButton } from "../../shared-components/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../shared-components/inputs/CsgnTextArea";
import { CsgnInput } from "../../shared-components/inputs/TextInput/CsgnInput";
import { useUpdateUser } from "../data/useUpdateUser";
import { User, UserUpdateDTO } from "../models/User";

type Props = {
  user: User;
};

export const UserEditMain: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const [nickname, setNickname] = useState(user.nickname);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState<string | null>(null);
  const [defaultTick, setDefaultTick] = useState(user.defaultTick);
  const { updateUser, isUpdatingUser } = useUpdateUser(user.steamId);

  const onSave = useCallback(() => {
    setError(null);
    const updates = {
      nickname,
      bio,
      email,
      defaultTick,
    };
    const { error } = validateUserProfile(updates);

    if (error) {
      return setError(error);
    }

    updateUser(user.steamId, updates);
  }, [user.steamId, nickname, bio, email, updateUser, defaultTick]);

  return (
    <>
      <div className="user-edit">
        <h2>Edit {user.nickname}</h2>
        {error && <div className="error">{error}</div>}
        <CsgnInput
          required
          maxLength={18}
          label="Nickname"
          onChange={setNickname}
          initialValue={nickname}
        />
        <br />
        <CsgnInput
          required
          label="E-mail"
          onChange={setEmail}
          initialValue={email}
        />
        <br />
        <CsgnTextArea
          label="Bio"
          value={bio}
          placeholder="Tell us a little about yourself"
          onChange={setBio}
        />
        <TickrateSelector
          label="Default tickrate"
          defaultValue={defaultTick || "any"}
          onChange={setDefaultTick}
          hintText="Default tickrate when browsing nades."
        />
        <br />

        <div className="save-wrap">
          <CsgnSaveButton
            value="Save"
            onClick={onSave}
            disabled={isUpdatingUser}
          />
        </div>
      </div>
      <style jsx>{`
        .user-edit {
          background: ${colors.DP02};
          padding: ${Dimensions.PADDING_MEDIUM};
          border-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
        }

        .save-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .error {
          background: ${colors.ERROR};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          padding: ${Dimensions.PADDING_MEDIUM};
          color: white;
          border-radius: ${Dimensions.BORDER_RADIUS};
        }
      `}</style>
    </>
  );
};

function validateUserProfile(userUpdateDto: UserUpdateDTO) {
  const { email, nickname } = userUpdateDto;
  if (email && !email.includes("@")) {
    return { error: "Error: Not a valid e-mail" };
  }
  if (nickname && !isValidNickname(nickname)) {
    return { error: "Error: Nickname can only contain letters and number" };
  }
  return {
    error: null,
  };
}

function isValidNickname(nickname: string) {
  return Boolean(nickname.match("^[A-Za-z0-9]+$"));
}
