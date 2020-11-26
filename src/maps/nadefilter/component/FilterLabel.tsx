import { FC } from "react";

type Props = {
  value: string;
};

export const FilterLabel: FC<Props> = ({ value }) => {
  return (
    <>
      <div className="label">{value}</div>
      <style jsx>{`
        .label {
          font-size: 11px;
          text-align: center;
          width: 100%;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};
