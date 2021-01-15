import { FC } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

type Props = {
  value: string;
};

export const FilterLabel: FC<Props> = ({ value }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="label">{value}</div>
      <style jsx>{`
        .label {
          color: ${colors.TEXT};
          font-size: 11px;
          font-weight: 500;
          text-align: center;
          width: 100%;
        }
      `}</style>
    </>
  );
};
