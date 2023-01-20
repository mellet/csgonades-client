import { FC } from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaExclamation,
  FaExclamationCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { NadeCreateBody } from "../../models/Nade";

type Props = {
  newNade: Partial<NadeCreateBody>;
};

export const NadeAddStatusList: FC<Props> = ({ newNade }) => {
  const validVideo = isValidVideo(newNade);
  const validInfo = isValidInfo(newNade);
  const validResultImage = Boolean(newNade.imageBase64);
  const validLineupImage = Boolean(newNade.lineUpImageBase64);
  const validMapPosition = Boolean(newNade.map) && Boolean(newNade.mapEndCoord);

  return (
    <>
      <div>
        <h3>Validity check</h3>
        <ValidIcon isValid={validVideo} title="Video" />
        <ValidIcon isValid={validInfo} title="Information" />
        <ValidIcon isValid={validMapPosition} title="Map position" />
        <ValidIcon isValid={validResultImage} title="Result image" />
        <ValidIcon isValid={validLineupImage} title="Lineup image" />
      </div>
      <style jsx>{``}</style>
    </>
  );
};

const ValidIcon: FC<{ isValid: boolean; title: string }> = ({
  isValid,
  title,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <div>
        {isValid ? (
          <span className="icon">
            <FaCheckCircle style={{ position: "relative", top: 2 }} />
          </span>
        ) : (
          <span className="icon">
            <FaExclamationTriangle style={{ position: "relative", top: 2 }} />
          </span>
        )}{" "}
        {title}
      </div>
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }

        .icon {
          color: ${isValid ? colors.SUCCESS : colors.WARNING};
        }
      `}</style>
    </>
  );
};

const isValidVideo = (newNade: Partial<NadeCreateBody>) => {
  return Boolean(newNade.gfycat);
};

const isValidInfo = (newNade: Partial<NadeCreateBody>) => {
  const {
    description,
    endPosition,
    map,
    movement,
    startPosition,
    technique,
    type,
    teamSide,
  } = newNade;

  if (
    !description ||
    !endPosition ||
    !map ||
    !movement ||
    !startPosition ||
    !technique ||
    !type ||
    !teamSide
  ) {
    return false;
  }

  return true;
};
