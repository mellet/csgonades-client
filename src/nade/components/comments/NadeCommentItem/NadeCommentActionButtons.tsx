import { FC, useState } from "react";
import { FaBan, FaPen } from "react-icons/fa";
import { Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../core/settings/useTheme";
import { CSGNModal } from "../../../../shared-components/CSGNModal";
import { CsgnSaveButton } from "../../../../shared-components/inputs/CsgnSaveButton";
import { CsgnTextArea } from "../../../../shared-components/inputs/CsgnTextArea";
import {
  NadeComment,
  NadeCommentUpdateDTO,
} from "../../../data/NadeCommentApi";

type Props = {
  nadeComment: NadeComment;
  onUpdateComment: (commentUpdate: NadeCommentUpdateDTO) => void;
  onDeleteComment: (commentId: string) => void;
};

export const NadeCommentActionButtons: FC<Props> = ({
  nadeComment,
  onDeleteComment,
  onUpdateComment,
}) => {
  const { colors } = useTheme();
  const [editorVisisble, setEditorVisisble] = useState(false);
  const [deleteConfirmVisisble, setDeleteConfirmVisible] = useState(false);
  const [message, setMessage] = useState(nadeComment.message);

  async function updateComment() {
    if (!message.length) {
      return;
    }
    setEditorVisisble(false);
    onUpdateComment({
      id: nadeComment.id,
      message,
    });
  }

  async function deleteComment() {
    setDeleteConfirmVisible(false);
    onDeleteComment(nadeComment.id);
  }

  return (
    <>
      <div className="actions">
        <button className="edit-btn" onClick={() => setEditorVisisble(true)}>
          <span>Edit</span>
          <FaPen />
        </button>
        <button
          className="delete-btn"
          onClick={() => setDeleteConfirmVisible(true)}
        >
          <span>Delete</span> <FaBan />
        </button>
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
          <CsgnSaveButton onClick={updateComment} />
        </div>
      </CSGNModal>

      <CSGNModal
        empty={true}
        visible={deleteConfirmVisisble}
        onDismiss={() => setDeleteConfirmVisible(false)}
      >
        <div className="comment-delete-confirm">
          <p>Are you sure you want to delete this comment?</p>
          <button onClick={deleteComment}>Yes</button>
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
          border-radius: ${Dimensions.BORDER_RADIUS};
        }

        .cancel-btn {
          margin-left: 15px;
          background: transparent !important;
          border: 1px solid #bbb !important;
          color: #bbb;
        }

        .actions {
          display: flex;
          flex-direction: row;
        }

        .actions button {
          border: none;
          padding: 6px 10px;
          cursor: pointer;
          color: ${colors.TEXT};
          font-size: 14px;
          font-weight: 300;
          border: 1px solid ${colors.BORDER};
          margin-right: 4px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          display: flex;
          align-items: center;
          background: ${colors.DP02};
          transition: all 0.2s;
        }

        .actions button span {
          margin-right: 4px;
        }

        .actions button:focus-visible {
          outline: 1px auto ${colors.PRIMARY};
        }

        .actions button:hover {
          background: ${colors.DP03};
        }

        .delete-btn:hover {
          background: ${colors.reportRed} !important;
          color: white !important;
        }
      `}</style>
    </>
  );
};
