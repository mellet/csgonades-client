import { FC } from "react";
import { NadeSpecificIconProps } from "./shared/NadeIconProps";

export const FlashIconStatic: FC<NadeSpecificIconProps> = ({
  size,
  count,
  isNew,
}) => {
  return (
    <>
      <svg
        width={size || 100}
        height={size || 100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 57L71 0L52.1429 57H16Z" fill="#464646" />
        <path d="M85 44L31 100L49.5143 44H85Z" fill="#464646" />
        <path d="M15 56L69 0L50.4857 56H15Z" fill="#FFD600" />
        <path d="M84 44L29 100L47.8571 44H84Z" fill="#FFD600" />
        {count && (
          <text
            className="count anim"
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {count}
          </text>
        )}
        {isNew && (
          <text
            className="new-label anim"
            x="50%"
            y="85%"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            NEW
          </text>
        )}
      </svg>
    </>
  );
};
