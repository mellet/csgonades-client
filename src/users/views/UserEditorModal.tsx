import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { ButtonWithIcon } from "../../shared-components/buttons/ButtonWithIcon";
import { CSGNModal } from "../../shared-components/CSGNModal";
import { CsgnInput } from "../../shared-components/inputs/TextInput/CsgnInput";
import { CsgnSaveButton } from "../../shared-components/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../shared-components/inputs/CsgnTextArea";
import { User } from "../models/User";
import { useIsAllowedUserEdit } from "../../core/authentication/useIsAllowedUserEdit";
import { useUpdateUser } from "../data/useUpdateUser";
import { Dimensions } from "../../constants/Constants";
import { ButtonGroup } from "../../map/components/nadefilter/component/ButtonGroup";

type Props = {
  user: User;
};

export const UserEditorModal: FC<Props> = ({ user }) => {
  const updateUser = useUpdateUser();
  const allowEdit = useIsAllowedUserEdit(user);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);

  if (!allowEdit) {
    return null;
  }

  function onSave() {
    updateUser(user.steamId, {
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
          <CsgnSaveButton onClick={onSave} />
        </div>
      </CSGNModal>
      <ButtonGroup>
        <ButtonWithIcon
          icon={<FaEdit />}
          value="Edit user profile"
          onClick={() => setIsEditing(true)}
        />
      </ButtonGroup>
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
