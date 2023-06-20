import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/useTheme";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  numPairings: number;
  onStart: () => void;
};

export const EloGameStartScreen: FC<Props> = ({ numPairings, onStart }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="start-screen">
        <p>Welcome to Nade Battle Royal!</p>
        <p>
          We&apos;ve curated a collection of <b>{numPairings} nade pairings</b>{" "}
          for you. It&apos;s your time to shine by choosing the true winners!
        </p>
        <p>
          Every vote you cast holds tremendous power in shaping the rankings of
          these exceptional contenders on our site. Your discerning judgment
          will determine the hierarchy of these nades.
        </p>
        <button onClick={onStart}>
          Start rating! <FaChevronRight />
        </button>
      </div>
      <style jsx>{`
        .start-screen {
          max-width: 500px;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        button {
          padding: 12px 20px;
          cursor: pointer;
          background: ${colors.SUCCESS};
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 200px;
          opacity: 0.9;
        }

        button:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
};
