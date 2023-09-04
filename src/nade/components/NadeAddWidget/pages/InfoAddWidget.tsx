import { FC } from "react";
import { Dimensions } from "../../../../constants/Constants";
import { Box } from "../../../../shared-components/box/Box";
import { SplitLayout } from "../../../../shared-components/box/SplitBox";
import { Seperator } from "../../../../shared-components/Seperator";
import { Title } from "../../../../shared-components/title/Title";
import { NadeCreateBody } from "../../../models/NadeCreateBody";
import { Technique } from "../../../models/Technique";
import { DescriptionInput } from "../../NadeInputs/DescriptionInput";
import { MapSelector } from "../../NadeInputs/MapSelector";
import { OneWaySelector } from "../../NadeInputs/OneWaySelector";
import { ProLinkInput } from "../../NadeInputs/ProLinkInput";
import { SetPosInput } from "../../NadeInputs/SetPosInput";
import { TeamSideSelector } from "../../NadeInputs/TeamSideSelector";
import { TechniqueSelector } from "../../NadeInputs/TechniqueSelector";
import { TickrateSelector } from "../../NadeInputs/TickrateSelector";
import { NadeMovementSelector } from "../NadeMovementSelector";
import { NadeTypeSelector } from "../NadeTypeSelector";
import { NextNavigation } from "../NextNavigation";
import { useCreateNade } from "../state/NadeAddStateProvider";
import { NadeGameModeSelector } from "../NadeGameModeSelector";

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
              <NadeGameModeSelector
                defaultValue={nade.gameMode}
                onChange={actions.setGameMode}
              />
            }
          />
          <SplitLayout
            left={
              <TeamSideSelector
                defaultValue={nade.teamSide}
                onChange={actions.setTeamSide}
              />
            }
            right={
              <MapSelector defaultValue={nade.map} onChange={actions.setMap} />
            }
          />
          <SplitLayout
            left={
              <NadeMovementSelector
                selectedMovement={nade.movement}
                onMovementSelect={actions.setMovement}
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
            left={<></>}
            right={
              nade.gameMode === "csgo" &&
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
                currentProLink={nade.proUrl}
                onChange={actions.setProLink}
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
