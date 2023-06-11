import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";

type Props = {
  value: string;
  center?: boolean;
};

export const FilterLabel: FC<Props> = ({ value, center }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="label">{value}</div>
      <style jsx>{`
        .label {
          color: ${colors.TEXT};
          font-size: 11px;
          line-height: 11px;
          margin-bottom: 4px;
          font-weight: 500;
          text-align: ${center ? "center" : "left"};
          width: 100%;
        }
      `}</style>
    </>
  );
};
