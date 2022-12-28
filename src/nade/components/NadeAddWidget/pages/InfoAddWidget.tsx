import { FC } from "react";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { Movement } from "../../../models/NadeMovement";
import { Tickrate } from "../../../models/NadeTickrate";
import { TeamSide } from "../../../models/TeamSide";
import { Technique } from "../../../models/Technique";
import { DescriptionInput } from "../../NadeInputs/DescriptionInput";
import { EndPosInput } from "../../NadeInputs/EndPosInput";
import { MovementSelector } from "../../NadeInputs/MovementSelector";
import { OneWaySelector } from "../../NadeInputs/OneWaySelector";
import { SetPosInput } from "../../NadeInputs/SetPosInput";
import { TeamSideSelector } from "../../NadeInputs/TeamSideSelector";
import { TechniqueSelector } from "../../NadeInputs/TechniqueSelector";
import { ThrownFromInput } from "../../NadeInputs/ThrownFromInput";
import { TickrateSelector } from "../../NadeInputs/TickrateSelector";
import { NextNavigation } from "../NextNavigation";

type Props = {
  onSetEndPosition: (endPosition: string) => void;
  onSetStartPosition: (startPosition: string) => void;
  onSetTeleportPosition: (setPos: string) => void;
  onSetDescription: (description: string) => void;
  onSetMovement: (movement: Movement) => void;
  onSetTechnique: (technique: Technique) => void;
  onSetOneWay: (oneWay: boolean) => void;
  onSetTeamSide: (teamSide: TeamSide) => void;
  onSetTickrate: (tickrate: Tickrate) => void;
  onNextStep: () => void;
};

export const InfoAddWidget: FC<Props> = ({
  onNextStep,
  onSetEndPosition,
  onSetStartPosition,
  onSetTeleportPosition,
  onSetDescription,
  onSetMovement,
  onSetTechnique,
  onSetOneWay,
  onSetTeamSide,
  onSetTickrate,
}) => {
  return (
    <>
      <Box>
        <div className="info-add-widget-layout">
          <div className="left">
            <EndPosInput onChange={onSetEndPosition} />
            <ThrownFromInput onChange={onSetStartPosition} />
            <DescriptionInput onChange={onSetDescription} />
            <SetPosInput onChange={onSetTeleportPosition} />
          </div>
          <div className="right">
            <OneWaySelector onClick={onSetOneWay} />
            <MovementSelector onChange={onSetMovement} />
            <TeamSideSelector onChange={onSetTeamSide} />
            <TechniqueSelector onChange={onSetTechnique} />
            <TickrateSelector onChange={onSetTickrate} />
          </div>
        </div>
      </Box>
      <NextNavigation onNextStep={onNextStep} enabled={Boolean(true)} />
      <style jsx>{`
        .info-add-widget-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas: "left right";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
