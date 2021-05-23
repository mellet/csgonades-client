import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { CSGNModal } from "../../../shared-components/CSGNModal";
import { NadeApi } from "../../data/NadeApi";

type Props = {
  nadeId: string;
};

export const DeleteBtn: FC<Props> = ({ nadeId }) => {
  const getOrUpdateToken = useGetOrUpdateToken();
  const [confirmModalVisisble, setConfirmModalVisisble] = useState(false);
  const { colors } = useTheme();
  const router = useRouter();

  async function onPermaDeletNade() {
    const token = await getOrUpdateToken();

    if (!token) {
      return;
    }

    await NadeApi.delete(nadeId, token);

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
          <button onClick={onPermaDeletNade}>Yes</button>{" "}
          <button onClick={() => setConfirmModalVisisble(false)}>No</button>
        </div>
      </CSGNModal>

      <button
        className="delete-btn"
        onClick={() => setConfirmModalVisisble(true)}
      >
        DELETE
      </button>
      <style jsx>{`
        .confirm-modal {
          padding: ${Dimensions.GUTTER_SIZE}px;
          min-width: 33vw;
        }

        .delete-btn {
          width: 100%;
          background: ${colors.ERROR};
          color: white;
          border: none;
          outline: none;
          height: 41px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 14px;
          cursor: pointer;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        .delete-btn:hover {
          background: ${colors.ERROR};
        }

        .delete-btn:disabled {
          background: #636363;
          opacity: 0.5;
          cursor: not-allowed;
        }

        .delete-btn:disabled:hover {
          background: #636363;
        }
      `}</style>
    </>
  );
};
