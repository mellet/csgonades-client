import { FC } from "react";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export const CsgnSaveButton: FC<Props> = ({ onClick, disabled }) => {
  const { colors } = useTheme();

  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {disabled ? <>Loading...</> : <>Update</>}
      </button>
      <style jsx>{`
        button {
          background: ${colors.PRIMARY};
          border-radius: 5px;
          border: none;
          color: white;
          cursor: pointer;
          outline: none;
          padding: 15px 30px;
        }
      `}</style>
    </>
  );
};
