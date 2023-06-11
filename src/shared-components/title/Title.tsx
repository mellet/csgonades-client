import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  title: string;
  titleStyle: "primary" | "secondary" | "tertiary";
  bottomSpacing?: boolean;
};

export const Title: FC<Props> = ({ titleStyle, title, bottomSpacing }) => {
  const { colors } = useTheme();
  return (
    <>
      {titleStyle === "primary" && <h1>{title}</h1>}
      {titleStyle === "secondary" && <h2>{title}</h2>}
      {titleStyle === "tertiary" && <h3>{title}</h3>}

      <div></div>
      <style jsx>{`
        h1,
        h2,
        h3 {
          margin: 0;
          padding: 0;
          margin-bottom: ${bottomSpacing ? Dimensions.PADDING_MEDIUM : 0};
          color: ${colors.TEXT};
        }

        h1 {
          font-size: 26px;
        }

        h2 {
          font-size: 22px;
        }

        h3 {
          font-size: 18px;
        }
      `}</style>
    </>
  );
};
