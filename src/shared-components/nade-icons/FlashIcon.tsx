import { FC } from "react";
import {
  ANIMATION_SPEED,
  COUNT_ANIMATION_DELAY,
  NEW_LABEL_ANIMATION_DELAY,
} from "./shared/NadeIconAnimationConstants";
import { NadeSpecificIconProps } from "./shared/NadeIconProps";

export const FlashIcon: FC<NadeSpecificIconProps> = ({
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
      <style jsx>{`
        svg {
          animation: scaleUp ${ANIMATION_SPEED}s ease-in forwards;
        }

        .anim {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform-origin: center;
        }

        text {
          font-family: "Changa One", Arial, serif;
          opacity: 0;
          animation-name: anim-fadeId;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${COUNT_ANIMATION_DELAY}s;
        }

        .count {
          font-size: 60px;
          line-height: 60px;
          fill: white;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
        }

        .new-label {
          font-size: 22px;
          fill: #d4ff00;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
          animation-delay: ${NEW_LABEL_ANIMATION_DELAY}s;
        }

        @keyframes scaleUp {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes anim-fadeId {
          from {
            opacity: 0;
            transform: translateY(20%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
