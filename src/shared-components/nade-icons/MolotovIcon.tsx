import { FC } from "react";
import {
  ANIMATION_SPEED,
  COUNT_ANIMATION_DELAY,
  NEW_LABEL_ANIMATION_DELAY,
} from "./shared/NadeIconAnimationConstants";
import { NadeSpecificIconProps } from "./shared/NadeIconProps";

export const MolotovIcon: FC<NadeSpecificIconProps> = ({
  size,
  count,
  isNew,
}) => {
  const svgSize = size || 100;

  return (
    <>
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.3982 48.7773C19.3236 45.1276 15.1936 28.4548 13.8879 20.5747C13.8893 19.9363 13.8938 19.2846 13.9016 18.6215C8.3084 27.1051 5 37.6095 5 48.9833C5 77.1591 25.3031 100 50.3483 100C75.3934 100 95.6965 77.1591 95.6965 48.9833C95.6965 36.7343 91.8594 25.4936 85.4636 16.6995C83.0925 27.4231 77.6266 34.0558 73.0224 37.9924C67.5367 14.5412 47.3277 4.2475 37.7941 0C41.9891 20.3651 32.1531 40.1073 25.3982 48.7773Z"
          fill="#CE1B1B"
        />
        <path
          d="M86.311 23.5955C94.4701 42.9161 99.0689 84.7965 52.1909 97.7527C66.5312 92.3542 93.4317 69.965 86.311 23.5955Z"
          fill="black"
          fillOpacity="0.1"
        />

        {count && (
          <text className="count anim" x="50%" y="55%">
            {count}
          </text>
        )}
        {isNew && (
          <text className="new-label anim" x="50%" y="90%">
            NEW
          </text>
        )}
      </svg>

      <style jsx>{`
        svg {
          width: ${size ? `${size}px` : "100%"};
          animation: scaleUp ${ANIMATION_SPEED}s ease-in forwards;
        }

        .anim {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform-origin: center;
        }

        text {
          font-family: "Changa One", cursiv;
          alignment-baseline: middle;
          text-anchor: middle;
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

        @keyframes scaleUp {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(0.9);
          }
        }
      `}</style>
    </>
  );
};
