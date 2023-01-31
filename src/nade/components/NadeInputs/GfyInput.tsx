import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { cleanGfycatUrl } from "../../../utils/Common";
import { NadeApi } from "../../data/NadeApi";
import { GfycatData } from "../../models/GfycatData";
import { useDisplayToast } from "../../../core/toasts/hooks/useDisplayToast";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { GfycatInputValidIcon } from "./GfycatInputValidIcon";
import { DebounceInput } from "react-debounce-input";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { InfoBox } from "../../../shared-components/box/InfoBox";

type Props = {
  defaultValue?: string;
  onChange: (value: GfycatData) => void;
};

export const GfyInput: FC<Props> = ({ onChange, defaultValue }) => {
  const { colors } = useTheme();
  const displayToast = useDisplayToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLargeVideo, setIsLargeVideo] = useState(false);

  const onSetGfycat: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (event) => {
      const value = event.target.value;
      if (!value.length || value.length < 5) {
        return;
      }

      setIsLargeVideo(false);
      setIsLoading(true);
      const gfycat = await verifyGfycat(value);
      setIsLoading(false);

      if (!gfycat) {
        setIsValid(false);
        displayToast({
          durationSeconds: 20,
          message:
            "Failed to validate Gfycat Url. It is either mistyped or Gfycat is down at the moment.",
          severity: "error",
        });
      } else {
        const sizeMb = gfycat.size ? gfycat.size / 1000000 : 0;

        console.log("size", sizeMb);
        if (sizeMb > 60) {
          setIsLargeVideo(true);
        }
        onChange(gfycat);
        setIsValid(true);
      }
    },
    [displayToast, onChange]
  );

  return (
    <>
      <MiniLabel value="Gfycat Video Url" />
      <div className="input-wrap">
        <DebounceInput
          minLength={6}
          debounceTimeout={1000}
          onChange={onSetGfycat}
          placeholder="Example: https://gfycat.com/confusedwiltedamazonparrot"
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

async function verifyGfycat(gfyUrl) {
  const cleanId = cleanGfycatUrl(gfyUrl);

  if (!cleanId) {
    return false;
  }

  const gfyResult = await NadeApi.validateGfycat(cleanId);

  if (gfyResult.isErr()) {
    return false;
  }

  return gfyResult.value;
}
