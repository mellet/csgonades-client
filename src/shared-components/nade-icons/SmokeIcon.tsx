import { FC } from "react";
import {
  ANIMATION_SPEED,
  MAIN_X_OFFSET,
  MAIN_Y_OFFSET,
  SIDE_X_OFFSET,
  STAGGER_OFFSET,
  TEXT_ANIMATION_DELAY,
} from "./shared/NadeIconAnimationConstants";
import { NadeIconProps } from "./shared/NadeIconProps";

export const SmokeIcon: FC<NadeIconProps> = ({ size, count, isNew }) => {
  return (
    <>
      <svg
        className="anim"
        width={size || 100}
        height={size || 100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="t-left anim" cx="50" cy="50" r="25" fill="#D9D9D9" />
        <circle
          className="t-right anim"
          cx="50"
          cy="50"
          r="25"
          fill="#D9D9D9"
        />
        <circle className="b-left anim" cx="50" cy="50" r="25" fill="#D9D9D9" />
        <circle
          className="b-right anim"
          cx="50"
          cy="50"
          r="25"
          fill="#D9D9D9"
        />
        <circle className="c-left anim" cx="50" cy="50" r="25" fill="#D9D9D9" />
        <circle
          className="c-right anim"
          cx="50"
          cy="50"
          r="25"
          fill="#D9D9D9"
        />
        <path
          className="anim shadow"
          d="M24.9696 73.8816C17.6107 66.4345 7.48676 47.0768 25.8624 29.2232C22.2943 35.5759 17.1204 53.4014 24.9696 73.8816Z"
          fill="black"
          fillOpacity="0.1"
        />
        {count && (
          <text
            className="count anim"
            x="50%"
            y="55%"
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
        text {
          font-family: "Changa One", Arial, serif;
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

        .anim {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          transform-origin: center;
        }

        .shadow {
          animation-name: anim-fadeId;
          opacity: 0;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${STAGGER_OFFSET * 20}s;
        }

        .t-left {
          transform: scale(0);
          animation-name: anim-c1;
          animation-duration: ${ANIMATION_SPEED}s;
        }

        .t-right {
          transform: scale(0);
          animation-name: anim-c2;
          animation-duration: ${ANIMATION_SPEED}s;
        }

        .b-left {
          transform: scale(0);
          animation-name: anim-c3;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${STAGGER_OFFSET * 2}s;
        }

        .b-right {
          transform: scale(0);
          animation-name: anim-c4;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${STAGGER_OFFSET * 2}s;
        }

        .c-left {
          transform: scale(0);
          animation-name: anim-c-left;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${STAGGER_OFFSET * 3}s;
        }

        .c-right {
          transform: scale(0);
          animation-name: anim-c-right;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${STAGGER_OFFSET * 3}s;
        }

        @keyframes anim-main {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes anim-c1 {
          from {
            transform: scale(0) translateX(0px) translateY(0px);
          }
          to {
            transform: scale(1) translateX(-${MAIN_X_OFFSET}px)
              translateY(-${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c2 {
          from {
            transform: scale(0) translateX(0px) translateY(0px);
          }
          to {
            transform: scale(1) translateX(${MAIN_X_OFFSET}px)
              translateY(-${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c3 {
          from {
            transform: scale(0) translateX(0px) translateY(0px);
          }
          to {
            transform: scale(1) translateX(${MAIN_X_OFFSET}px)
              translateY(${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c4 {
          from {
            transform: scale(0) translateX(0px) translateY(0px);
          }
          to {
            transform: scale(1) translateX(-${MAIN_X_OFFSET}px)
              translateY(${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c-left {
          from {
            transform: scale(0) translateX(0px) translateY(0px);
          }
          to {
            transform: scale(1) translateX(-${SIDE_X_OFFSET}px) translateY(0px);
          }
        }

        @keyframes anim-c-right {
          from {
            transform: scale(0) translateX(0px) translateY(0px);
          }
          to {
            transform: scale(1) translateX(${SIDE_X_OFFSET}px) translateY(0px);
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
