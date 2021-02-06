import { FC, useState } from "react";
import { useTheme } from "styled-components";
import { useGetOrUpdateToken } from "../../../../core/authentication/useGetToken";
import { CSGNModal } from "../../../../shared-components/CSGNModal";
import { CsgnSaveButton } from "../../../../shared-components/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../../../shared-components/inputs/CsgnTextArea";
import { NadeComment, NadeCommentApi } from "../../../data/NadeCommentApi";

type Props = {
  nadeComment: NadeComment;
  refetchComment: () => void;
};

export const NadeCommentActionButtons: FC<Props> = ({
  nadeComment,
  refetchComment,
}) => {
  const { colors } = useTheme();
  const getToken = useGetOrUpdateToken();
  const [editorVisisble, setEditorVisisble] = useState(false);
  const [deleteConfirmVisisble, setDeleteConfirmVisible] = useState(false);
  const [message, setMessage] = useState(nadeComment.message);

  async function onUpdateComment() {
    const token = await getToken();

    if (!token) {
      setEditorVisisble(false);
      return;
    }

    await NadeCommentApi.updateNadeComment(
      nadeComment.nadeId,
      {
        id: nadeComment.id,
        message,
      },
      token
    );

    setEditorVisisble(false);
    refetchComment();
  }

  async function onDeleteComment() {
    const token = await getToken();

    if (!token) {
      setDeleteConfirmVisible(false);
      return;
    }

    const res = await NadeCommentApi.deleteNadeComment(
      nadeComment.nadeId,
      nadeComment.id,
      token
    );

    if (res.isErr()) {
      // TODO: Show error toast
    }

    refetchComment();
    setDeleteConfirmVisible(false);
  }

  return (
    <>
      <div className="actions">
        <button onClick={() => setEditorVisisble(true)}>Edit</button>
        <button onClick={() => setDeleteConfirmVisible(true)}>Delete</button>
      </div>

      <CSGNModal
        title="Edit comment"
        visible={editorVisisble}
        onDismiss={() => setEditorVisisble(false)}
      >
        <div className="comment-editor">
          <CsgnTextArea
            label="Message"
            defaultValue={message}
            onChange={setMessage}
          />
          <CsgnSaveButton onClick={onUpdateComment} />
        </div>
      </CSGNModal>

      <CSGNModal
        empty={true}
        visible={deleteConfirmVisisble}
        onDismiss={() => setDeleteConfirmVisible(false)}
      >
        <div className="comment-delete-confirm">
          <p>Are you sure you want to delete this comment?</p>
          <button onClick={onDeleteComment}>Yes</button>
          <button
            className="cancel-btn"
            onClick={() => setDeleteConfirmVisible(false)}
          >
            Cancel
          </button>
        </div>
      </CSGNModal>

      <style jsx>{`
        .comment-editor {
          min-width: 400px;
        }

        .comment-delete-confirm {
          background: maroon;
          color: white;
          border-radius: 5px;
          padding: 20px;
          text-align: center;
          max-width: 300px;
          margin: 0 auto;
        }

        .comment-delete-confirm button {
          appearance: none;
          background: white;
          padding: 10px 15px;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 5px;
        }

        .cancel-btn {
          margin-left: 15px;
          background: transparent !important;
          border: 1px solid #bbb !important;
          color: #bbb;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
        }

        .actions button {
          border: none;
          padding: 6px 10px;
          background: ${colors.DP03};
          cursor: pointer;
          color: ${colors.TEXT};
          outline: none;
          font-size: 14px;
          font-weight: 300;
          border: 1px solid ${colors.buttonBorder};
        }

        .actions button:first-child {
          border-right: none;
          border-bottom-left-radius: 5px;
        }

        .actions button:last-child {
          border-bottom-right-radius: 5px;
        }

        .actions button:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
