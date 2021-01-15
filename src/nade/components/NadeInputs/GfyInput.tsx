import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/CsgnInput";
import { cleanGfycatUrl } from "../../../utils/Common";
import { NadeApi } from "../../data/NadeApi";
import { GfycatData } from "../../models/GfycatData";
import { useDisplayToast } from "../../../store/ToastStore/hooks/useDisplayToast";

type Props = {
  defaultValue?: string;
  onChange: (value: GfycatData) => void;
};

export const GfyInput: FC<Props> = ({ onChange, defaultValue }) => {
  const displayToast = useDisplayToast();

  function onGfySet(value: string) {
    if (!value.length) {
      return;
    }

    verifyGfycat(value).then((val) => {
      if (!val) {
        displayToast({
          durationSeconds: 20,
          message:
            "Failed to validate Gfycat Url. It is either mistyped or Gfycat is down at the moment.",
          severity: "error",
        });
      } else {
        onChange(val);
      }
    });
  }

  return (
    <>
      <CsgnInput
        initialValue={defaultValue}
        label="Gfycat Video Url"
        onChange={onGfySet}
        placeholder="Example: https://gfycat.com/confusedwiltedamazonparrot"
      />
    </>
  );
};

async function verifyGfycat(gfyUrl) {
  const cleanId = cleanGfycatUrl(gfyUrl);

  const gfyResult = await NadeApi.validateGfycat(cleanId);

  if (gfyResult.isErr()) {
    return false;
  }

  return gfyResult.value;
}
