import { FC } from "react";
import {
  ANIMATION_SPEED,
  TEXT_ANIMATION_DELAY,
} from "./shared/NadeIconAnimationConstants";
import { NadeIconProps } from "./shared/NadeIconProps";

export const HEIcon: FC<NadeIconProps> = ({ size, count, isNew }) => {
  return (
    <>
      <svg
        width={size || 100}
        height={size || 100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M50 0L56.75 39.1747L96.7654 25L63.5 50L96.7654 75L56.75 60.8253L50 100L43.25 60.8253L3.23463 75L36.5 50L3.23463 25L43.25 39.1747L50 0Z"
            fill="#CE1B1B"
          />
          <path
            d="M50 14L54.75 42.2058L82.909 32L59.5 50L82.909 68L54.75 57.7942L50 86L45.25 57.7942L17.091 68L40.5 50L17.091 32L45.25 42.2058L50 14Z"
            fill="#AC1C1C"
          />
          <path
            d="M39.4887 36.6548L31.1415 21.2571L17.0686 15.7767L39.4887 36.6548Z"
            fill="black"
          />
          <path
            d="M39.2623 23.2713L35.6463 17.0083L38.2047 12.3997L39.2623 23.2713Z"
            fill="black"
          />
          <path
            d="M60.4394 65.5175L67.7217 78.2732L79.6326 83.0121L60.4394 65.5175Z"
            fill="black"
          />
          <path
            d="M59.3836 79.31L62.9996 85.573L60.4412 90.1816L59.3836 79.31Z"
            fill="black"
          />
        </g>
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
        <defs>
          <clipPath id="clip0">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <style jsx>{`
        svg {
          animation: scaleUp 0.2s ease-in forwards;
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
          animation-delay: ${TEXT_ANIMATION_DELAY}s;
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
