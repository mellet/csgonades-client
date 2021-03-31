import { FC } from "react";

type Props = {
  size?: number;
};

export const FlashIcon: FC<Props> = ({ size }) => {
  return (
    <>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 57L71 0L52.1429 57H16Z" fill="#464646" />
        <path d="M85 44L31 100L49.5143 44H85Z" fill="#464646" />
        <path d="M15 56L69 0L50.4857 56H15Z" fill="#FFD600" />
        <path d="M84 44L29 100L47.8571 44H84Z" fill="#FFD600" />
      </svg>
      <style jsx>{`
        svg {
          width: ${size ? `${size}px` : "100%"};
        }
      `}</style>
    </>
  );
};
