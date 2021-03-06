import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ButtonWithIcon } from "../../shared-components/buttons/ButtonWithIcon";
import { CSGNModal } from "../../shared-components/CSGNModal";
import { CsgnInput } from "../../shared-components/inputs/TextInput/CsgnInput";
import { CsgnSaveButton } from "../../shared-components/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../shared-components/inputs/CsgnTextArea";
import { User } from "../models/User";
import { useIsAllowedUserEdit } from "../../core/authentication/useIsAllowedUserEdit";
import { userSelector } from "../../core/authentication/AuthSelectors";
import { useUpdateUser } from "../data/useUpdateUser";
import { Dimensions } from "../../constants/Constants";

type Props = {
  user: User;
};

export const UserEditorModal: FC<Props> = ({ user }) => {
  const updateUser = useUpdateUser();
  const allowEdit = useIsAllowedUserEdit(user);
  const [isEditing, setIsEditing] = useState(false);
  const signedInUser = useSelector(userSelector);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  if (!allowEdit) {
    return null;
  }

  function onSave() {
    if (!signedInUser) {
      console.warn("No signed in user");
      return;
    }

    setLoading(true);

    updateUser(signedInUser.steamId, {
      nickname,
      email,
      bio,
    });
  }

  return (
    <>
      <CSGNModal
        title="Edit user"
        visible={isEditing}
        onDismiss={() => setIsEditing(false)}
      >
        <div className="user-editor">
          <CsgnInput
            label="Nickname"
            onChange={setNickname}
            initialValue={nickname}
          />
          <br />
          <CsgnInput label="E-mail" onChange={setEmail} initialValue={email} />
          <br />
          <CsgnTextArea label="Bio" value={bio} onChange={setBio} />
          <CsgnSaveButton disabled={loading} onClick={onSave} />
        </div>
      </CSGNModal>
      <ButtonWithIcon
        icon={<FaEdit />}
        value="Edit user profile"
        backgroundColor="#3252a8"
        onClick={() => setIsEditing(true)}
      />
      <style jsx>{`
        .user-editor {
          display: flex;
          flex-direction: column;
          min-width: 40vw;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
