import { FC, useState, memo } from "react";
import { useGetOrUpdateToken } from "../../../core/authentication/useGetToken";
import { NadeCommentApi, NadeComment } from "../../data/NadeCommentApi";
import { useIsSignedIn } from "../../../core/authentication/useIsSignedIn";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { Config, Dimensions } from "../../../constants/Constants";

type Props = {
  nadeId: string;
  onCommentSubmitted: (newComment: NadeComment) => void;
};

export const CommentSubmit: FC<Props> = memo(
  ({ nadeId, onCommentSubmitted }) => {
    const { colors } = useTheme();
    const isSignedIn = useIsSignedIn();
    const getToken = useGetOrUpdateToken();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function onSubmit() {
      setLoading(true);
      const token = await getToken();

      if (!token || !message.length) {
        return;
      }

      const res = await NadeCommentApi.createNadeComment(
        { nadeId, message },
        token
      );

      if (res.isOk()) {
        onCommentSubmitted(res.value);
      }

      setMessage("");
      setLoading(false);
    }

    const submitDisabled = message.length === 0 || loading;

    return (
      <>
        {isSignedIn && (
          <div id="comments" className="nade-submit">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a comment. It's a person on the other side, don't be to mean! 😏"
            />
            <button
              className="submit-btn"
              onClick={onSubmit}
              disabled={submitDisabled}
            >
              SUBMIT
            </button>
          </div>
        )}
        {!isSignedIn && (
          <div id="comments" className="comment-sign-in">
            <p>Do you want to comment on this nade?</p>
            <div>
              <a href={Config.SIGN_IN_URL}>Sign in with steam</a>
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
        `}</style>
      </>
    );
  }
);
