import { FC } from "react";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  value?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const CsgnSaveButton: FC<Props> = ({ onClick, disabled, value }) => {
  const { colors } = useTheme();

  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {disabled ? <>Loading...</> : <>{value || "Update"}</>}
      </button>
      <style jsx>{`
        button {
          background: ${colors.SUCCESS};
          border-radius: 5px;
          border: none;
          color: white;
          cursor: pointer;
          outline: none;
          padding: 10px 16px;
          opacity: 0.85;
        }

        button:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
};
