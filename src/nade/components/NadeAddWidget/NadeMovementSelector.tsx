import { FC } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { SquareButton } from "../../../shared-components/buttons/IconButton/SquareButton";
import { ButtonGroup } from "../../../shared-components/buttons/IconButtonGroup/IconButtonGroup";
import { NadeMovement, movementString } from "../../models/NadeMovement";
import { MiniLabel } from "../NadeLabels/MiniLabel";
import { MovementIcon } from "./MovementIcon";

type Props = {
  onMovementSelect: (movement: NadeMovement) => void;
  selectedMovement?: NadeMovement;
};

export const NadeMovementSelector: FC<Props> = ({
  onMovementSelect,
  selectedMovement,
}) => {
  const { colors } = useTheme();
  return (
    <div className="type-selector-container">
      <MiniLabel value="Movement" />
      <ButtonGroup>
        <SquareButton
          inGroup
          icon={<MovementIcon movement="stationary" />}
          active={selectedMovement === "stationary"}
          onClick={() => onMovementSelect("stationary")}
        />
        <SquareButton
          inGroup
          icon={<MovementIcon movement="crouching" />}
          active={selectedMovement === "crouching"}
          onClick={() => onMovementSelect("crouching")}
        />
        <SquareButton
          inGroup
          icon={<MovementIcon movement="crouchwalking" />}
          active={selectedMovement === "crouchwalking"}
          onClick={() => onMovementSelect("crouchwalking")}
        />
        <SquareButton
          inGroup
          icon={<MovementIcon movement="walking" />}
          active={selectedMovement === "walking"}
          onClick={() => onMovementSelect("walking")}
        />
        <SquareButton
          inGroup
          last
          icon={<MovementIcon movement="running" />}
          active={selectedMovement === "running"}
          onClick={() => onMovementSelect("running")}
        />
      </ButtonGroup>

      <span className="movment-string">{movementString(selectedMovement)}</span>
      <style jsx>{`
        .movment-string {
          font-size: 12px;
          font-style: italic;
          color: ${colors.GREY};
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
};
