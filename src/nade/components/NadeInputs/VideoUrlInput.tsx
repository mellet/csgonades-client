import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { useDisplayToast } from "../../../core/toasts/hooks/useDisplayToast";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { GfycatInputValidIcon } from "./GfycatInputValidIcon";
import { DebounceInput } from "react-debounce-input";
import { useTheme } from "../../../core/settings/useTheme";
import { InfoBox } from "../../../shared-components/box/InfoBox";

type Props = {
  defaultValue?: string;
  onSetYouTubeId: (youTubeId: string) => void;
};

export const VideoUrlInput: FC<Props> = ({ defaultValue, onSetYouTubeId }) => {
  const { colors } = useTheme();
  const displayToast = useDisplayToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLargeVideo, setIsLargeVideo] = useState(false);

  const onSetVideoUrl: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      const value = event.target.value;
      if (!value.length || value.length < 5) {
        return;
      }
      setIsLoading(false);
      setIsLargeVideo(false);
      setIsValid(null);

      const youTubeId = tryGetYouTubeId(value);

      if (youTubeId) {
        setIsValid(true);
        return onSetYouTubeId(youTubeId);
      } else {
        setIsValid(false);
        displayToast({
          durationSeconds: 20,
          message: "Failed to validate URL",
          severity: "error",
        });
      }
    },
    [displayToast, onSetYouTubeId]
  );

  return (
    <>
      <MiniLabel value="Video Url" />
      <div className="input-wrap">
        <DebounceInput
          minLength={6}
          debounceTimeout={1000}
          onChange={onSetVideoUrl}
          placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          defaultValue={defaultValue}
          value={defaultValue}
          className="debounce-input"
        />
        <div className="icon">
          <GfycatInputValidIcon isLoading={isLoading} isValid={isValid} />
        </div>
        {isLargeVideo && (
          <InfoBox type="warning" style={{ marginTop: 15 }} title="Large Video">
            Video size is very large! This will risk the video being very slow
            loading for many people. Please see if you can reduce the size of
            the video you uploaded.
          </InfoBox>
        )}
      </div>
      <style jsx>{`
        .warning {
          color: white;
          background: #f09800;
        }

        .input-wrap {
          position: relative;
        }

        .icon {
          position: absolute;
          top: 0;
          right: 10px;
          bottom: 0;
          display: flex;
          align-items: center;
        }
      `}</style>

      <style jsx global>
        {`
          .debounce-input {
            background: ${colors.DP02};
            border-radius: 5px;
            border: 1px solid ${colors.BORDER};
            color: ${colors.TEXT};
            outline: none;
            padding: 10px 12px;
            height: 40px;
            width: 100%;
          }

          .debounce-input:focus {
            border: 1px solid ${colors.filterBgHover};
          }

          .debounce-input::placeholder {
            color: #ccc;
            font-weight: 300;
          }
        `}
      </style>
    </>
  );
};

function tryGetYouTubeId(input: string) {
  const youTubeRegex =
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/;
  const result = input.match(youTubeRegex);

  if (result && result.length > 1) {
    return result[1];
  }

  return null;
}
