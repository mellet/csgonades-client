import getConfig from "next/config";
import { FC, useState, memo } from "react";
import { useGetOrUpdateToken } from "../../../store/AuthStore/hooks/useGetToken";
import { NadeCommentApi, NadeComment } from "../../../core/api/NadeCommentApi";
import { useIsSignedIn } from "../../../store/AuthStore/AuthHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../../../constants/Constants";

type Props = {
  nadeId: string;
  onCommentSubmitted: (newComment: NadeComment) => void;
};

export const CommentSubmit: FC<Props> = memo(
  ({ nadeId, onCommentSubmitted }) => {
    const { colors } = useTheme();
    const isSignedIn = useIsSignedIn();
    const getToken = useGetOrUpdateToken();
    const { config } = getConfig();

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
            <div>
              <a href={config.apiUrl + "/auth/steam"}>Sign in with steam</a>
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
          }

          .comment-sign-in p {
            margin-bottom: 10px;
            font-size: 16px;
          }

          .nade-submit {
            position: relative;
            display: flex;
            flex-direction: column;
          }

          textarea {
            background: ${colors.DP03};
            outline: none;
            min-height: 120px;
            resize: none;
            padding: ${Dimensions.GUTTER_SIZE}px;
            border-radius: 5px;
            color: ${colors.TEXT};
            border: 1px dashed ${colors.BORDER};
          }

          textarea:focus {
            border: 1px solid ${colors.SUCCESS};
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
