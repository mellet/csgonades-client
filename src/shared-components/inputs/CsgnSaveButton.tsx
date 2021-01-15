import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  onClick: () => void;
};

export const CsgnSaveButton: FC<Props> = ({ onClick }) => {
  const { colors } = useTheme();

  return (
    <>
      <button onClick={onClick}>SAVE</button>
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
