import { FC } from "react";
import { CsgnInput } from "../../../shared-components/inputs/CsgnInput";
import { NadeApi } from "../../data/NadeApi";
import { useDisplayToast } from "../../../store/ToastStore/hooks/useDisplayToast";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const SlugInput: FC<Props> = ({ onChange, defaultValue }) => {
  const displayToast = useDisplayToast();

  async function onSlugChanged(slug: string) {
    const slugIsFree = await NadeApi.slugIsFree(slug);

    if (!slugIsFree) {
      displayToast({
        severity: "error",
        message: "Slug taken",
      });
    } else {
      displayToast({
        severity: "info",
        message: "Slug ok!",
      });
      onChange(slug);
    }
  }

  return (
    <CsgnInput
      initialValue={defaultValue}
      label="Slug"
      onChange={onSlugChanged}
    />
  );
};
