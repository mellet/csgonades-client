import { FC } from "react";

export type SmokeIconProps = {
  size?: number;
};

const MAIN_X_OFFSET = 13;
const MAIN_Y_OFFSET = 15;
const SIDE_X_OFFSET = 25;
const ANIMATION_SPEED = 0.2;
const ANIMATION_DELAY = 0.1;

export const SmokeIcon: FC<SmokeIconProps> = ({ size }) => {
  return (
    <>
      <svg
        className="anim"
        width="100"
        height="100"
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
          d="M24.9696 73.8816C17.6107 66.4345 7.48676 47.0768 25.8624 29.2232C22.2943 35.5759 17.1204 53.4014 24.9696 73.8816Z"
          fill="white"
          fillOpacity="0.4"
        />
      </svg>
      <style jsx>{`
        svg {
          width: ${size ? `${size}px` : "100%"};
          transform: scale(0);
          animation-name: anim-main;
          animation-duration: ${ANIMATION_SPEED}s;
        }

        .anim {
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
        }

        .t-left {
          animation-name: anim-c1;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${ANIMATION_DELAY}s;
        }

        .t-right {
          animation-name: anim-c2;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${ANIMATION_DELAY}s;
        }

        .b-left {
          animation-name: anim-c3;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${ANIMATION_DELAY}s;
        }

        .b-right {
          animation-name: anim-c4;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${ANIMATION_DELAY}s;
        }

        .c-left {
          animation-name: anim-c-left;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${ANIMATION_DELAY}s;
        }

        .c-right {
          animation-name: anim-c-right;
          animation-duration: ${ANIMATION_SPEED}s;
          animation-delay: ${ANIMATION_DELAY}s;
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
            transform: translateX(0px) translateY(0px);
          }
          to {
            transform: translateX(-${MAIN_X_OFFSET}px)
              translateY(-${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c2 {
          from {
            transform: translateX(0px) translateY(0px);
          }
          to {
            transform: translateX(${MAIN_X_OFFSET}px)
              translateY(-${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c3 {
          from {
            transform: translateX(0px) translateY(0px);
          }
          to {
            transform: translateX(${MAIN_X_OFFSET}px)
              translateY(${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c4 {
          from {
            transform: translateX(0px) translateY(0px);
          }
          to {
            transform: translateX(-${MAIN_X_OFFSET}px)
              translateY(${MAIN_Y_OFFSET}px);
          }
        }

        @keyframes anim-c-left {
          from {
            transform: translateX(0px) translateY(0px);
          }
          to {
            transform: translateX(-${SIDE_X_OFFSET}px) translateY(0px);
          }
        }

        @keyframes anim-c-right {
          from {
            transform: translateX(0px) translateY(0px);
          }
          to {
            transform: translateX(${SIDE_X_OFFSET}px) translateY(0px);
          }
        }
      `}</style>
    </>
  );
};
