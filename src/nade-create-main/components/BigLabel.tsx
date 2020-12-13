import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  value: string;
};

export const BigLabel: FC<Props> = ({ value }) => {
  const { colors } = useTheme();

  return (
    <>
      <h2>{value}</h2>
      <style jsx>{`
        h2 {
          margin: 0;
          padding: 0;
          font-size: 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          padding-bottom: 10px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
