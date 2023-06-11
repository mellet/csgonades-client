import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  title: string;
  description: string;
};

export const AdminPageTitle: FC<Props> = ({ title, description }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="admin-page-title">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <style jsx>{`
        .admin-page-title {
          background: ${colors.DP02};
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: ${colors.TEXT};
          padding: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          border: 1px solid ${colors.BORDER};
        }

        .admin-page-title h1 {
          font-size: 24px;
        }
      `}</style>
    </>
  );
};
