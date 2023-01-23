import { FC } from "react";

type Props = {
  size?: number;
};

export const CrossHairSvg: FC<Props> = ({ size }) => {
  return (
    <>
      <svg width={size || 43} height={size ? size + 1 : 44} viewBox="0 0 43 44">
        <style>
          {".prefix__st0{fill:#fff;stroke:#000;stroke-miterlimit:10}"}
        </style>
        <path
          className="prefix__st0"
          d="M19.5 27.5h4v16h-4zM19.5.5h4v16h-4zM16.5 20v4H.5v-4zM42.5 20v4h-16v-4z"
        />
      </svg>
    </>
  );
};
