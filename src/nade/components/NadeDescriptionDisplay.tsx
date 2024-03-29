import { FC } from "react";
import { useTheme } from "../../core/settings/useTheme";
import { RenderMarkdown } from "./RenderMarkdown";

type Props = {
  value?: string;
};

export const NadeDescriptionDisplay: FC<Props> = ({ value }) => {
  const { colors } = useTheme();
  if (!value || value.length === 0) {
    return (
      <>
        <div className="no-desc">
          <em>No description.</em>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="desc-wrap">
        <RenderMarkdown value={value} />
      </div>
      <style jsx>{`
        .desc-wrap {
          color: ${colors.TEXT};
        }
      `}</style>
      <style global jsx>{`
        .desc-wrap p {
          font-size: 16px;
        }

        .desc-wrap pre {
          background: ${colors.DP01};
          border-radius: 5px;
          padding: 5px;
        }

        .desc-wrap code {
          white-space: normal;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};
