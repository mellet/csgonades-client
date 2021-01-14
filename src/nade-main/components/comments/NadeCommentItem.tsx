import { FC, useState } from "react";
import { NadeComment, NadeCommentApi } from "../../../core/api/NadeCommentApi";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { prettyDateTime } from "../../../utils/DateUtils";
import { useSignedInUser } from "../../../core/authentication/useSignedInUser";
import { CSGNModal } from "../../../common/CSGNModal";
import { CsgnTextArea } from "../../../common/inputs/CsgnTextArea";
import { CsgnSaveButton } from "../../../common/inputs/CsgnSaveButton";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import Link from "next/link";
import { Dimensions } from "../../../constants/Constants";
import { RenderMarkdown } from "../RenderMarkdown";

type Props = {
  nadeComment: NadeComment;
  refetchComment: () => void;
};

export const NadeCommentItem: FC<Props> = ({ nadeComment, refetchComment }) => {
  const getToken = useGetOrUpdateToken();
  const [editorVisisble, setEditorVisisble] = useState(false);
  const [deleteConfirmVisisble, setDeleteConfirmVisible] = useState(false);
  const [message, setMessage] = useState(nadeComment.message);
  const allowEditAndDelete = useAllowEditComment(nadeComment);
  const { colors } = useTheme();

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
      <div className="nade-comment-item">
        <div className="nade-comment-header">
          <Link href={`/users/${nadeComment.steamId}`}>
            <a className="nade-comment-user">
              <img src={nadeComment.avatar} />
              {nadeComment.nickname}
              {nadeComment.steamId === "76561198026064832" && (
                <span className="admin-label">ADMIN</span>
              )}
            </a>
          </Link>
          <div className="nade-comment-date">
            {prettyDateTime(nadeComment.createdAt)}
          </div>
        </div>
        <div className="nade-comment-msg">
          <RenderMarkdown value={nadeComment.message} />
        </div>
        {allowEditAndDelete && (
          <div className="actions">
            <button onClick={() => setEditorVisisble(true)}>Edit</button>
            <button onClick={() => setDeleteConfirmVisible(true)}>
              Delete
            </button>
          </div>
        )}
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
        .admin-label {
          font-size: 9px;
          border-radius: 5px;
          background: #3c9e72;
          color: white;
          height: 18px;
          display: flex;
          align-items: center;
          margin-left: 10px;
          padding-left: 3px;
          padding-right: 3px;
          font-weight: 500;
        }

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

        .nade-comment-item {
          background: ${colors.DP02};
          color: ${colors.TEXT};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          border: 1px solid ${colors.BORDER};
        }

        .nade-comment-header {
          background: ${colors.DP01};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .nade-comment-user {
          display: flex;
          align-items: center;
          color: ${colors.TEXT};
        }

        .nade-comment-user img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .nade-comment-date {
          color: #bbb;
          font-size: 16px;
        }

        .nade-comment-msg {
          padding: 10px 16px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          margin-right: 5px;
          margin-bottom: 5px;
        }

        .actions button {
          border: none;
          padding: 6px 10px;
          background: transparent;
          cursor: pointer;
          color: ${colors.PRIMARY};
          outline: none;
          font-size: 14px;
          font-weight: 300;
          border: 1px solid ${colors.BORDER};
        }

        .actions button:first-child {
          border-right: none;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .actions button:last-child {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .actions button:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

const useAllowEditComment = (nadeComment: NadeComment) => {
  const user = useSignedInUser();

  if (!user) {
    return false;
  }

  /*if (user.role === "administrator" || user.role === "moderator") {
    return true
  }*/

  if (user.steamId === nadeComment.steamId) {
    return true;
  }

  return false;
};
