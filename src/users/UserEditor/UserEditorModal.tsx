import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ButtonWithIcon } from "../../common/ButtonWithIcon";
import { CSGNModal } from "../../common/CSGNModal";
import { CsgnInput } from "../../common/inputs/CsgnInput";
import { CsgnSaveButton } from "../../common/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../common/inputs/CsgnTextArea";
import { User } from "../../models/User";
import { useIsAllowedUserEdit } from "../../core/authentication/useIsAllowedUserEdit";
import { userSelector } from "../../core/authentication/AuthSelectors";
import { useUpdateUser } from "../../store/UsersStore/hooks/useUpdateUser";

type Props = {
  user: User;
};

export const UserEditorModal: FC<Props> = ({ user }) => {
  const updateUser = useUpdateUser();
  const allowEdit = useIsAllowedUserEdit(user);
  const [isEditing, setIsEditing] = useState(false);
  const signedInUser = useSelector(userSelector);
  const [nickname, setNickname] = useState(
    signedInUser ? signedInUser.nickname : user.nickname
  );
  const [email, setEmail] = useState(
    signedInUser ? signedInUser.email : user.nickname
  );
  const [bio, setBio] = useState(signedInUser ? signedInUser.bio : user.bio);

  if (!allowEdit) {
    return null;
  }

  function onSave() {
    if (!signedInUser) {
      console.warn("No signed in user");
      return;
    }

    updateUser(signedInUser.steamId, {
      nickname,
      email,
      bio,
    });
    setIsEditing(false);
  }

  return (
    <>
      <CSGNModal
        title="Edit user"
        visible={isEditing}
        onDismiss={() => setIsEditing(false)}
      >
        <div className="user-editor">
          <CsgnInput label="Nickname" value={nickname} onChange={setNickname} />
          <CsgnInput label="E-mail" value={email} onChange={setEmail} />
          <CsgnTextArea label="Bio" value={bio} onChange={setBio} />
          <CsgnSaveButton onClick={onSave} />
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
        }
      `}</style>
    </>
  );
};
