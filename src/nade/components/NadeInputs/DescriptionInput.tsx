import { FC } from "react";
import { CsgnTextArea } from "../../../shared-components/inputs/CsgnTextArea";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "../../../core/settings/SettingsHooks";

type Props = {
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const DescriptionInput: FC<Props> = ({ onChange, defaultValue }) => {
  const { colors } = useTheme();

  return (
    <>
      <CsgnTextArea
        defaultValue={defaultValue}
        label="Description"
        onChange={onChange}
        placeholder="Write how to perform the throw. "
      />
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
