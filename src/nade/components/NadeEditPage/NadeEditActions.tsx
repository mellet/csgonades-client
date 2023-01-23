import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useEditNade } from "../../data/NadeEdit/useEditNade";
import { useUpdateNade } from "../../data/NadeEdit/useUpdateNade";
import { Nade } from "../../models/Nade";
import { DeleteBtn } from "../NadeInputs/DeleteBtn";
import { SumbitBtn } from "../NadeInputs/SubmitBtn";

type Props = {
  nade: Nade;
};

export const NadeEditActions: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const { nadeUpdates } = useEditNade();
  const { onUpdateNade, isLoading, isUpdateNadeEnabled } = useUpdateNade(
    nade,
    nadeUpdates
  );
  return (
    <>
      <div id="submit">
        <SumbitBtn
          label="UPDATE"
          onSubmit={onUpdateNade}
          disabled={!isUpdateNadeEnabled || isLoading}
        />
        <DeleteBtn nadeId={nade.id} confirmWord={nade.map || ""} />
      </div>
      <style jsx>{`
        #submit {
          position: fixed;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: end;
          padding: ${Dimensions.GUTTER_SIZE}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE / 2}px;
          background: ${colors.DP03};
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border: 1px solid ${colors.BORDER};
          z-index: 1;
        }
      `}</style>
    </>
  );
};
