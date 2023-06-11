import { FC } from "react";
import { FaRegImage } from "react-icons/fa";
import { useTheme } from "../../../../core/settings/useTheme";

export const NoImage: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <div className="no-image-container">
        <div className="no-image">
          <div className="hint">
            Select a image by clicking on{" "}
            <FaRegImage style={{ position: "relative", top: 3 }} /> in the
            toolbar above.
          </div>
        </div>
      </div>
      <style jsx>{`
        .no-image-container {
          position: relative;
          padding-top: calc(9 / 16 * 100%);
        }

        .no-image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }

        .hint {
          font-size: 18px;
          color: ${colors.GREY};
        }
      `}</style>
    </>
  );
};
