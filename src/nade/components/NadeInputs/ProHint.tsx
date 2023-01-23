import { FC } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../../core/settings/SettingsHooks";

export const ProHint: FC = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <em>
        <span>
          <FaCheckCircle />
        </span>
        <br />
        Get a blue checkmark on the nade (Verified Pro).
        <br />
        Add a link to a video showing a pro CS:GO player throwing this nade in
        the description.
        <br /> Include timestamp if needed.
        <br />
        It has to be the exact nade, or very very similar.
      </em>
      <style jsx>{`
        span {
          color: #00b8d9;
        }

        em {
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
