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

    return (
      <>
        {isSignedIn && (
          <div id="comments" className="nade-submit">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a comment. It's a person on the other side, don't be to mean! 😏"
            />
            <button onClick={onSubmit} disabled={loading}>
              Submit
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
            border-radius: 8px;
            color: ${colors.TEXT};
            border: 1px dashed ${colors.BORDER};
            border-bottom-right-radius: 0px;
          }

          textarea:focus {
            border: 1px solid ${colors.SUCCESS};
          }

          textarea::placeholder {
            color: #ccc;
            font-weight: 300;
          }

          .nade-submit button {
            align-self: flex-end;
            border: none;
            background: ${colors.filterBg};
            padding: 10px 15px;
            color: white;
            outline: none;
            cursor: pointer;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }

          .nade-submit button:hover {
            background: ${colors.filterBgHover};
          }
        `}</style>
      </>
    );
  }
);
