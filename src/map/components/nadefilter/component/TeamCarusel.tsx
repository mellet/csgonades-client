import Image from "next/image";
import { FC, useMemo } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";

type Props = {
  selectedIndex: number;
};

export const TeamCarusel: FC<Props> = ({ selectedIndex }) => {
  const { colors, theme } = useTheme();

  const options = ["Any", "T", "CT"];
  const currentValue = options[selectedIndex] || "";

  return (
    <>
      <div className="option-carusel">
        <span className="option-value">
          <TeamSideImage teamSide={currentValue} />
        </span>
      </div>
      <style jsx>{`
        .option-carusel {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .option-value {
          font-size: 15px;
          line-height: 15px;
          display: block;
          width: 100%;
          text-align: center;
          margin-bottom: 3px;
          padding-top: 4px;
          color: ${colors.TEXT};
        }

        .indicator {
          display: flex;
        }

        .indiciator-circle {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${theme === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
          margin-right: 2px;
        }

        .active {
          background: #00b8d9;
        }

        .indiciator-circle:last-child {
          margin-right: 0;
        }
      `}</style>
    </>
  );
};

type TeamSideImageProps = {
  teamSide: string;
};

const TeamSideImage: FC<TeamSideImageProps> = ({ teamSide }) => {
  const imageUrl = useMemo(() => {
    switch (teamSide) {
      case "T":
        return "/icons/terrorist.webp";
      case "CT":
        return "/icons/ct.webp";
      default:
        return "/icons/team-both.webp";
    }
  }, [teamSide]);

  return <Image src={imageUrl} width={26} height={26} />;
};
