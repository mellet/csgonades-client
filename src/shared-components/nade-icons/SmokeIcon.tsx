import { FC } from "react";
import {
  ANIMATION_SPEED,
  COUNT_ANIMATION_DELAY,
  NEW_LABEL_ANIMATION_DELAY,
} from "./shared/NadeIconAnimationConstants";
import { NadeSpecificIconProps } from "./shared/NadeIconProps";

export const SmokeIcon: FC<NadeSpecificIconProps> = ({
  size,
  count,
  isNew,
}) => {
  return (
    <>
      <svg
        className="main anim"
        width={size || 100}
        height={size || 100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="54" r="25" fill="#D9D9D9" />
        <circle cx="75" cy="54" r="25" fill="#D9D9D9" />
        <circle cx="38" cy="39" r="25" fill="#D9D9D9" />
        <circle cx="63" cy="39" r="25" fill="#D9D9D9" />
        <circle cx="38" cy="68" r="25" fill="#D9D9D9" />
        <circle cx="63" cy="68" r="25" fill="#D9D9D9" />
        <path
          d="M24.9696 73.8816C17.6107 66.4345 7.48676 47.0768 25.8624 29.2232C22.2943 35.5759 17.1204 53.4014 24.9696 73.8816Z"
          fill="white"
          fillOpacity="0.4"
        />
        {count && (
          <text
            className="count anim"
            x="50%"
            y="57%"
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
          opacity: 0;
          transform: scale(0);
          animation: scaleUp ${ANIMATION_SPEED}s ease-in forwards;
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
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
          animation-delay: ${COUNT_ANIMATION_DELAY}s;
        }

        .new-label {
          font-size: 22px;
          fill: #d4ff00;
          text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
          animation-delay: ${NEW_LABEL_ANIMATION_DELAY}s;
        }

        .anim {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform-origin: center;
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes anim-fadeId {
          0% {
            opacity: 0;
            transform: translateY(20%);
          }
          30% {
            opacity: 0;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};
