import { FC } from "react";

export type SmokeIconProps = {
  size?: number;
};

export const SmokeIcon: FC<SmokeIconProps> = ({ size }) => {
  return (
    <>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25" cy="54" r="25" fill="#D9D9D9" />
        <circle cx="75" cy="54" r="25" fill="#D9D9D9" />
        <circle cx="38" cy="39" r="25" fill="#D9D9D9" />
        <circle cx="63" cy="39" r="25" fill="#D9D9D9" />
        <circle cx="38" cy="61" r="25" fill="#D9D9D9" />
        <circle cx="63" cy="61" r="25" fill="#D9D9D9" />
        <path
          d="M24.9696 73.8816C17.6107 66.4345 7.48676 47.0768 25.8624 29.2232C22.2943 35.5759 17.1204 53.4014 24.9696 73.8816Z"
          fill="white"
          fillOpacity="0.4"
        />
      </svg>
      <style jsx>{`
        svg {
          width: ${size ? `${size}px` : "100%"};
        }
      `}</style>
    </>
  );
};
