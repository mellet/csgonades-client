import { FC } from "react";
import { Box } from "../../../../shared-components/box/Box";
import { Seperator } from "../../../../shared-components/Seperator";
import { Title } from "../../../../shared-components/title/Title";
import { NextNavigation } from "../NextNavigation";
import { useCreateNade } from "../state/NadeAddStateProvider";
import dynamic from "next/dynamic";

const MapPositionSelector = dynamic(
  () => import("../MapPositionSelector").then((m) => m.MapPositionSelector),
  {
    ssr: false,
  }
);

export const MapAddWidget: FC = ({}) => {
  const { nade, actions } = useCreateNade();

  if (!nade.map || !nade.type || !nade.gameMode) {
    return (
      <Box>
        Select a map, nade type and before you can select the nade landing
        position.
      </Box>
    );
  }

  return (
    <>
      <Box>
        <Title titleStyle="primary" title="Nade locations" />
        <Seperator />
        <div className="add-map-container">
          <div className="map-position-container">
            <MapPositionSelector
              gameMode={nade.gameMode}
              selectedMap={nade.map}
              selectedType={nade.type}
              selectedMapEndLocationId={nade.mapEndLocationId}
              selectedMapStartLocationId={nade.mapStartLocationId}
              onSetMapEndLocation={actions.setMapEndLocation}
              onSetMapStartLocation={actions.setMapStartLocation}
            />
          </div>
        </div>
        <NextNavigation
          onNextStep={() => actions.setCurrentStep("resultImage")}
          enabled={Boolean(nade.mapEndLocationId && nade.mapStartLocationId)}
        />
      </Box>
      <style jsx>{`
        .add-map-container {
        }

        .map-position-container {
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
