import { FC } from "react";
import { Box } from "../../../../shared-components/box/Box";
import { Seperator } from "../../../../shared-components/Seperator";
import { Title } from "../../../../shared-components/title/Title";
import { MapPositionSelector } from "../../MapPositionSelector";
import { NextNavigation } from "../NextNavigation";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const MapAddWidget: FC = ({}) => {
  const { nade, actions } = useCreateNade();

  if (!nade.map) {
    return (
      <Box>Select a map before you can select the nade landing position.</Box>
    );
  }

  return (
    <>
      <Box>
        <Title titleStyle="primary" title="Nade landing location" />
        <Seperator />
        <div className="add-map-container">
          <div className="map-position-container">
            <MapPositionSelector
              selectedMap={nade.map}
              selectedStartPosition={nade.mapStartCoord}
              selectedEndPosition={nade.mapEndCoord}
              onPositionChange={actions.setMapPosition}
            />
          </div>
        </div>
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("resultImage")}
          enabled={Boolean(nade.mapEndCoord)}
        />
      </Box>
      <style jsx>{`
        .add-map-container {
        }

        .map-position-container {
          max-width: 75vh;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
