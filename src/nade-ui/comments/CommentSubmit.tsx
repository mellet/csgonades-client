import { FC, useState, memo } from "react";
import { useGetOrUpdateToken } from "../../store/AuthStore/hooks/useGetToken";
import { NadeCommentApi, NadeComment } from "../../api/NadeCommentApi";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Config } from "../../constants/Constants";

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
          <div className="nade-submit">
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
          <div className="comment-sign-in">
            <p>Do you want to comment on this nade?</p>
            <p>
              <a href={Config.SIGN_IN_URL}>Sign in with steam</a>
            </p>
          </div>
        )}

        <style jsx>{`
          .comment-sign-in {
            padding: 15px;
            background: ${colors.DP02};
            border-radius: 5px;
            text-align: center;
            color: ${colors.TEXT};
          }

          .nade-submit {
            position: relative;
            display: flex;
            flex-direction: column;
          }

          textarea {
            background: ${colors.DP03};
            outline: none;
            min-height: 200px;
            resize: none;
            padding: 15px;
            border-radius: 5px;
            color: ${colors.TEXT};
            border: 1px solid rgba(0, 0, 0, 0.15);
          }

          textarea:focus {
            border: 1px solid ${colors.filterBgHover};
          }

          textarea::placeholder {
            color: #ccc;
            font-weight: 300;
          }

          .nade-submit button {
            position: absolute;
            bottom: 10px;
            right: 10px;
            align-self: flex-end;
            border: none;
            background: ${colors.filterBg};
            padding: 10px 15px;
            border-radius: 5px;
            margin-top: 10px;
            color: white;
            outline: none;
            cursor: pointer;
          }

          .nade-submit button:hover {
            background: ${colors.filterBgHover};
          }
        `}</style>
      </>
    );
  }
);
