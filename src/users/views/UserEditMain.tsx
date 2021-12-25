import { FC, useCallback, useState } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";
import { TickrateSelector } from "../../nade/components/NadeInputs/TickrateSelector";
import { CsgnSaveButton } from "../../shared-components/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../shared-components/inputs/CsgnTextArea";
import { CsgnInput } from "../../shared-components/inputs/TextInput/CsgnInput";
import { useUpdateUser } from "../data/useUpdateUser";
import { User } from "../models/User";

type Props = {
  user: User;
};

export const UserEditMain: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  const [nickname, setNickname] = useState(user.nickname);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [defaultTick, setDefaultTick] = useState(user.defaultTick);
  const { updateUser, isUpdatingUser } = useUpdateUser(user.steamId);

  const onSave = useCallback(() => {
    updateUser(user.steamId, {
      nickname,
      bio,
      email,
      defaultTick,
    });
  }, [user.steamId, nickname, bio, email, updateUser, defaultTick]);

  return (
    <>
      <div className="user-edit">
        <h2>Edit {user.nickname}</h2>
        <CsgnInput
          label="Display name"
          onChange={setNickname}
          initialValue={nickname}
        />
        <br />
        <CsgnInput label="E-mail" onChange={setEmail} initialValue={email} />
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
      `}</style>
    </>
  );
};
