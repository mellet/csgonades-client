import { FC, useState, memo, ChangeEventHandler } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { AppConfig, Dimensions } from "../../../constants/Constants";
import { FaPaperPlane } from "react-icons/fa";

type Props = {
  onAddComment: (message: string) => void;
  isSignedIn: boolean;
};

export const CommentSubmit: FC<Props> = memo(({ onAddComment, isSignedIn }) => {
  const { colors } = useTheme();
  const [message, setMessage] = useState("");

  const isSubmitButtonDisabled = message.length === 0;

  async function onSubmit() {
    if (!message.length) {
      return;
    }

    onAddComment(message);
    setMessage("");
  }

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      {isSignedIn && (
        <div id="comments" className="nade-submit">
          <textarea
            value={message}
            onChange={onMessageChange}
            placeholder="Write a comment. It's a person on the other side, don't be to mean! 😏"
          />
          <button
            disabled={isSubmitButtonDisabled}
            className="submit-btn"
            onClick={onSubmit}
          >
            <span>Send</span>
            <FaPaperPlane />
          </button>
        </div>
      )}
      {!isSignedIn && (
        <div id="comments" className="comment-sign-in">
          <p>Do you want to comment on this nade?</p>
          <div>
            <a href={AppConfig.SIGN_IN_URL}>Sign in with steam</a>
          </div>
        </div>
      )}

      <style jsx>{`
        .comment-sign-in {
          padding: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP03};
          border-radius: ${Dimensions.BORDER_RADIUS};
          text-align: center;
          color: ${colors.TEXT};
          border: 1px solid ${colors.BORDER};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .comment-sign-in p {
          margin-bottom: 10px;
          font-size: 16px;
        }

        .nade-submit {
          display: flex;
          flex-direction: column;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        textarea {
          background: ${colors.DP03};
          outline: none;
          min-height: 120px;
          resize: none;
          padding: ${Dimensions.GUTTER_SIZE}px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
          border: 1px dashed ${colors.BORDER};
        }

        textarea:focus {
          outline: none;
          box-shadow: 0 0 0 1px ${colors.PRIMARY};
        }

        textarea::placeholder {
          color: #ccc;
          font-weight: 300;
        }

        .submit-btn {
          align-self: flex-end;
          border: none;
          background: ${colors.SUCCESS};
          padding: 8px 12px;
          color: white;
          outline: none;
          cursor: pointer;
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-top: 6px;
          font-size: 14px;
          transition: background 0.15s;
          display: flex;
          align-items: center;
        }

        .submit-btn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 1px ${colors.PRIMARY};
        }

        .submit-btn:hover {
          background: ${colors.filterBgHover};
        }

        .submit-btn:disabled {
          background: ${colors.GREY};
          cursor: not-allowed;
        }

        .submit-btn span {
          margin-right: 4px;
        }
      `}</style>
    </>
  );
});
