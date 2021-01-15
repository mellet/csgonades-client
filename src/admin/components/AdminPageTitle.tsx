import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";

type Props = {
  title: string;
  description: string;
};

export const AdminPageTitle: FC<Props> = ({ title, description }) => {
  const { colors } = useTheme();

  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <style jsx>{`
        div {
          background: ${colors.DP02};
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
          padding: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border: 1px solid ${colors.BORDER};
        }

        h1 {
          font-size: 24px;
        }
      `}</style>
    </>
  );
};
