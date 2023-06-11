import { FC } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { useTheme } from "../../../core/settings/useTheme";
import { CSGNIcon } from "../NadeStatus/CSGNIcon";

type Props = {
  isLoading: boolean;
  isValid: boolean | null;
};

export const GfycatInputValidIcon: FC<Props> = ({ isLoading, isValid }) => {
  const { colors } = useTheme();

  if (!isLoading && isValid === null) {
    return <></>;
  }

  return (
    <>
      {isLoading && (
        <CSGNIcon icon={<FaSpinner />} spin style={{ color: colors.GREY }} />
      )}
      {!isLoading && isValid && (
        <CSGNIcon icon={<FaCheckCircle />} style={{ color: "green" }} />
      )}
      {!isLoading && !isValid && (
        <CSGNIcon
          icon={<FaExclamationTriangle />}
          style={{ color: colors.ERROR }}
        />
      )}
      <style jsx>{``}</style>
    </>
  );
};
