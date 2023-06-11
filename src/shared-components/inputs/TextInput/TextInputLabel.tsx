import { FC } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../../core/settings/useTheme";

type Props = {
  label?: string;
  required?: boolean;
};

export const TextInputLabel: FC<Props> = ({ label, required }) => {
  const { colors } = useTheme();

  if (!label) {
    return null;
  }

  return (
    <>
      <label>
        {label}
        {required && (
          <Popup
            content="Required"
            inverted
            position="top center"
            size="tiny"
            trigger={
              <span>
                <FaStarOfLife />
              </span>
            }
          />
        )}
      </label>
      <style jsx>{`
        label {
          color: ${colors.TEXT};
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
          text-transform: uppercase;
        }

        span {
          color: red;
          display: inline-block;
          font-size: 6px;
          position: relative;
          top: -3px;
          margin-left: 2px;
        }
      `}</style>
    </>
  );
};
