import { FC } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useTheme } from "../../../core/settings/useTheme";

type Props = {
  optional?: boolean;
  value: string;
  hint?: string;
};

export const MiniLabel: FC<Props> = ({ value, optional, hint }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="label">
        <span className="label-value">
          {value} {optional ? "(optional)" : ""}
        </span>
        {hint && (
          <Popup
            content={hint}
            position="top center"
            inverted
            size="mini"
            trigger={
              <span className="icon">
                <FaQuestionCircle style={{ position: "relative", top: 1 }} />
              </span>
            }
          />
        )}
      </div>
      <style jsx>{`
        .label {
          font-size: 12px;
          line-height: 12px;
          font-weight: 500;
          margin-bottom: 10px;
          color: ${colors.TEXT};
        }

        .label-value {
          text-transform: uppercase;
          margin-right: 4px;
        }
      `}</style>
    </>
  );
};
