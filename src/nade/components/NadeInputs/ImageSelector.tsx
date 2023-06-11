import { FC } from "react";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { useTheme } from "../../../core/settings/useTheme";

type Props = {
  imageIsSet?: boolean;
  label: string;
  onClick: () => void;
  optional?: boolean;
};

export const ImageSelector: FC<Props> = ({
  imageIsSet,
  label,
  onClick,
  optional,
}) => {
  const { colors } = useTheme();

  const msgString = imageIsSet
    ? "CHANGE IMAGE (ONLY JPG)"
    : "SET IMAGE (ONLY JPG)";

  return (
    <>
      <MiniLabel value={label} optional={optional} />

      <button onClick={onClick} className="image-selector">
        {msgString}
      </button>
      <style jsx>{`
        .image-selector {
          width: 100%;
          background: ${colors.filterBg};
          color: white;
          border: none;
          outline: none;
          height: 41px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          font-size: 14px;
          cursor: pointer;
        }

        .image-selector:hover {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
