import { FC } from "react";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { SplitLayout } from "../../../../shared-components/box/SplitBox";
import { Seperator } from "../../../../shared-components/Seperator";
import { Title } from "../../../../shared-components/title/Title";
import { NadeCreateBody } from "../../../models/Nade";
import { Technique } from "../../../models/Technique";
import { DescriptionInput } from "../../NadeInputs/DescriptionInput";
import { NadeEndPosInput } from "../../NadeInputs/EndPosInput";
import { MapSelector } from "../../NadeInputs/MapSelector";
import { MovementSelector } from "../../NadeInputs/MovementSelector";
import { OneWaySelector } from "../../NadeInputs/OneWaySelector";
import { ProLinkInput } from "../../NadeInputs/ProLinkInput";
import { SetPosInput } from "../../NadeInputs/SetPosInput";
import { TeamSideSelector } from "../../NadeInputs/TeamSideSelector";
import { TechniqueSelector } from "../../NadeInputs/TechniqueSelector";
import { ThrownFromInput } from "../../NadeInputs/ThrownFromInput";
import { TickrateSelector } from "../../NadeInputs/TickrateSelector";
import { NadeMovementSelector } from "../NadeMovementSelector";
import { NadeTypeSelector } from "../NadeTypeSelector";
import { NextNavigation } from "../NextNavigation";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const InfoAddWidget: FC = ({}) => {
  const { nade, actions } = useCreateNade();

  return (
    <>
      <Box>
        <Title titleStyle="primary" title="Information" />
        <Seperator />
        <div className="info-add-widget-layout">
          <SplitLayout
            left={
              <NadeTypeSelector
                onTypeSelect={actions.setNadeType}
                selectedType={nade.type}
              />
            }
            right={
              <TeamSideSelector
                defaultValue={nade.teamSide}
                onChange={actions.setTeamSide}
              />
            }
          />
          <SplitLayout
            left={
              <MapSelector defaultValue={nade.map} onChange={actions.setMap} />
            }
            right={
              <NadeMovementSelector
                selectedMovement={nade.movement}
                onMovementSelect={actions.setMovement}
              />
            }
          />
          <SplitLayout
            left={
              <ThrownFromInput
                defaultValue={nade.startPosition}
                onChange={actions.setStartPosition}
              />
            }
            right={
              <TechniqueSelector
                defaultValue={nade.technique}
                onChange={actions.setTechnique}
              />
            }
          />

          <SplitLayout
            left={
              <NadeEndPosInput
                defaultValue={nade.endPosition}
                onChange={actions.setEndPosition}
              />
            }
            right={
              doesRequireTickrateTechnique(nade.technique) ? (
                <TickrateSelector
                  defaultValue={nade.tickrate}
                  onChange={actions.setTickrate}
                />
              ) : (
                <></>
              )
            }
          />

          <Seperator />

          <SplitLayout
            left={
              <ProLinkInput
                currentProLink=""
                onChange={() => {
                  return;
                }}
              />
            }
            right={
              <SetPosInput
                defaultValue={nade.setPos}
                onChange={actions.setTeleportCoordinates}
              />
            }
          />

          <OneWaySelector
            initialValue={nade.oneWay}
            onClick={actions.setOneWay}
          />
          <DescriptionInput
            defaultValue={nade.description}
            onChange={actions.setDescription}
          />
        </div>
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("map")}
          enabled={canClickNext(nade)}
        />
      </Box>

      <style jsx>{`
        .info-add-widget-layout {
          display: flex;
          flex-direction: column;
          gap: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};

const canClickNext = (nadeCreatBody: Partial<NadeCreateBody>): boolean => {
  return (
    Boolean(nadeCreatBody.type) &&
    Boolean(nadeCreatBody.map) &&
    Boolean(nadeCreatBody.startPosition) &&
    Boolean(nadeCreatBody.endPosition) &&
    Boolean(nadeCreatBody.teamSide) &&
    Boolean(nadeCreatBody.movement) &&
    Boolean(nadeCreatBody.technique) &&
    Boolean(nadeCreatBody.description)
  );
};

function doesRequireTickrateTechnique(technique?: Technique) {
  return (
    technique === "jumpthrow" ||
    technique === "jumpthrowBoth" ||
    technique === "jumpthrowW"
  );
}
