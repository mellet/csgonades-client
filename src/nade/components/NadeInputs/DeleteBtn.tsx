import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, Input } from "semantic-ui-react";
import { Dimensions } from "../../../constants/Constants";
import { ButtonWithIcon } from "../../../shared-components/buttons/ButtonWithIcon";
import { CSGNModal } from "../../../shared-components/CSGNModal";
import { NadeApi } from "../../data/NadeApi";

type Props = {
  nadeId: string;
  confirmWord: string;
};

export const DeleteBtn: FC<Props> = ({ nadeId, confirmWord }) => {
  const [confirmModalVisisble, setConfirmModalVisisble] = useState(false);
  const [confirmWordCheck, setConfirmWordCheck] = useState("");
  const router = useRouter();

  async function onPermaDeletNade() {
    await NadeApi.delete(nadeId);

    setTimeout(() => {
      router.push("/admin/deleted", "/admin/deleted");
    }, 3000);
  }

  return (
    <>
      <CSGNModal
        visible={confirmModalVisisble}
        onDismiss={() => setConfirmModalVisisble(false)}
        title="Are you sure you want to delete this nade?"
      >
        <div className="confirm-modal">
          <p>
            Write <code>{confirmWord}</code> to confirm deletion:
          </p>
          <p>
            <Input
              fluid
              onChange={(_, data) => {
                setConfirmWordCheck(data.value);
              }}
            />
          </p>
          <p>
            <Button
              disabled={confirmWordCheck !== confirmWord}
              onClick={onPermaDeletNade}
              color="red"
            >
              Delete
            </Button>
            <Button onClick={() => setConfirmModalVisisble(false)}>
              Cancel
            </Button>
          </p>
        </div>
      </CSGNModal>

      <div className="delete-btn-wrapper">
        <ButtonWithIcon
          icon={<FaTimes />}
          value={"Delete"}
          onClick={() => setConfirmModalVisisble(true)}
          color="#94150c"
        />
      </div>

      <style jsx>{`
        .confirm-modal {
          padding: ${Dimensions.GUTTER_SIZE}px;
          min-width: 33vw;
        }

        p {
          margin-bottom: 14px;
        }
        p:last-child {
          margin: 0;
        }

        code {
          background: #ccc;
          padding: 3px;
          border-radius: 3px;
        }

        .delete-btn-wrapper {
          margin-left: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
