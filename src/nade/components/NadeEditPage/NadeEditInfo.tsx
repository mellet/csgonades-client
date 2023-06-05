import { FC, useMemo } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useIsAdminOrModerator } from "../../../core/authentication/useIsAdminOrModerator";
import { Nade } from "../../models/Nade";
import { DescriptionInput } from "../NadeInputs/DescriptionInput";
import { NadeEndPosInput } from "../NadeInputs/EndPosInput";
import { VideoUrlInput } from "../NadeInputs/VideoUrlInput";
import { IsProSelector } from "../NadeInputs/IsProSelector";
import { MapSelector } from "../NadeInputs/MapSelector";
import { OneWaySelector } from "../NadeInputs/OneWaySelector";
import { SetPosInput } from "../NadeInputs/SetPosInput";
import { StatusSelector } from "../NadeInputs/StatusSelector";
import { TeamSideSelector } from "../NadeInputs/TeamSideSelector";
import { TechniqueSelector } from "../NadeInputs/TechniqueSelector";
import { ThrownFromInput } from "../NadeInputs/ThrownFromInput";
import { TickrateSelector } from "../NadeInputs/TickrateSelector";
import { BigLabel } from "../NadeLabels/BigLabel";
import { PreviewNade } from "../PreviewNades";
import { NadeTypeSelector } from "../NadeAddWidget/NadeTypeSelector";
import { NadeMovementSelector } from "../NadeAddWidget/NadeMovementSelector";
import { ProLinkInput } from "../NadeInputs/ProLinkInput";
import { useEditNade } from "../../data/NadeEdit/useEditNade";
import { NadeGameModeSelector } from "../NadeAddWidget/NadeGameModeSelector";

type Props = {
  nade: Nade;
};

export const NadeEditInfo: FC<Props> = ({ nade }) => {
  const { nadeUpdates, actions } = useEditNade();
  const isAdminOrModerator = useIsAdminOrModerator();

  const showTickrateSelector = useMemo(() => {
    const isJumpThrow = nadeUpdates.technique?.includes("jumpthrow");
    const isJumpthrowOriginal = nade.technique?.includes("jumpthrow");

    if (isJumpThrow || isJumpthrowOriginal) {
      return true;
    }
    return false;
  }, [nade.technique, nadeUpdates.technique]);

  return (
    <>
      <div id="edit-nade-page">
        <div id="info-label">
          <BigLabel value="Information" />
        </div>
        <div id="game-selector">
          <NadeGameModeSelector
            defaultValue={nadeUpdates.gameMode}
            onChange={actions.onSetGameMode}
          />
        </div>
        <div id="map-selector">
          <MapSelector
            defaultValue={nadeUpdates.map}
            onChange={actions.onSetMap}
          />
        </div>
        <div id="gfy-input">
          <VideoUrlInput
            defaultValue={nadeUpdates.youTubeId || nadeUpdates.gfycat?.gfyId}
            onSetYouTubeId={actions.onSetYouTubeId}
          />
        </div>
        <div id="end-pos">
          <NadeEndPosInput
            defaultValue={nadeUpdates.endPosition}
            onChange={actions.onSetEndPosition}
          />
        </div>
        <div id="start-pos">
          <ThrownFromInput
            defaultValue={nadeUpdates.startPosition}
            onChange={actions.onSetStartPosition}
          />
        </div>

        <div id="set-pos">
          <SetPosInput
            defaultValue={nadeUpdates.setPos}
            onChange={actions.onSetTeleportPosition}
          />
        </div>
        <div id="description">
          <DescriptionInput
            defaultValue={nadeUpdates.description}
            onChange={actions.onSetDescription}
          />
        </div>
        <div id="meta-label">
          <BigLabel value="Meta Data" />
        </div>
        <div id="teamside-selector">
          <TeamSideSelector
            defaultValue={nadeUpdates.teamSide}
            onChange={actions.onSetTeamSide}
          />
        </div>
        <div id="type-selector">
          <NadeTypeSelector
            selectedType={nadeUpdates.type}
            onTypeSelect={actions.onSetNadeType}
          />
        </div>
        <div id="movement-selector">
          <NadeMovementSelector
            selectedMovement={nadeUpdates.movement}
            onMovementSelect={actions.onSetMovement}
          />
        </div>

        <div id="technique-selector">
          <TechniqueSelector
            defaultValue={nadeUpdates.technique}
            onChange={actions.onSetTechnique}
          />
        </div>

        {showTickrateSelector && (
          <div id="tickrate-selector">
            <TickrateSelector
              defaultValue={nadeUpdates.tickrate}
              onChange={actions.onSetTickrate}
            />
          </div>
        )}

        <div id="oneway-selector">
          <OneWaySelector
            initialValue={nadeUpdates.oneWay}
            onClick={actions.onSetOneWay}
          />
        </div>

        <div id="pro-url">
          <ProLinkInput
            currentProLink={nadeUpdates.proUrl}
            onChange={actions.onSetProUrl}
          />
        </div>

        <div id="preview-label">
          <BigLabel value="Preview" />
        </div>

        <div id="preview">
          <PreviewNade
            commentCount={nade.commentCount}
            createdAt={nade.createdAt}
            viewCount={nade.viewCount}
            nade={{
              description: nadeUpdates.description,
              endPosition: nadeUpdates.endPosition,
              gfycat: nadeUpdates.gfycat,
              imageBase64: nadeUpdates.imageBase64,
              map: nadeUpdates.map,
              mapEndCoord: nadeUpdates.mapEndCoord,
              movement: nadeUpdates.movement,
              oneWay: nadeUpdates.oneWay,
              startPosition: nadeUpdates.startPosition,
              technique: nadeUpdates.technique,
              tickrate: nadeUpdates.tickrate,
              type: nadeUpdates.type,
              lineUpImageBase64: nadeUpdates.lineUpImageBase64,
              isPro: nadeUpdates.isPro,
              teamSide: nadeUpdates.teamSide,
              proUrl: nadeUpdates.proUrl,
              setPos: nadeUpdates.setPos,
              youTubeId: nadeUpdates.youTubeId,
            }}
          />
        </div>

        {isAdminOrModerator && (
          <>
            <div id="modlabel">
              <BigLabel value="Moderator settings" />
            </div>

            <div id="status">
              <StatusSelector
                initValue={nadeUpdates.status || nade.status}
                onChange={actions.onSetNadeStatus}
              />
            </div>

            <div id="is-pro">
              <IsProSelector
                initialValue={nadeUpdates.isPro}
                onClick={(isPro) => {
                  if (isPro) {
                    actions.onSetIsPro();
                  } else {
                    actions.onUnSetIsPro();
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .lineup-msg {
          background: rgba(255, 255, 255, 0.8);
          color: #111;
          border-radius: 5px;
          margin-bottom: 15px;
          padding: 10px;
        }

        #edit-nade-page {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-template-areas:
            "infolabel metalabel"
            "gamemode teamside"
            "mapsel movesel"
            "typesel techsel"
            "gfyip tick"
            "endpos oneway"
            "startpos ."
            "prourl previewlabel"
            "setpos preview"
            "desc preview"
            "desc preview"
            "desc preview"
            "modlabel preview"
            "status preview"
            "slug preview"
            "pro preview";
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
        }

        #pro-url {
          grid-area: prourl;
        }

        #set-pos {
          grid-area: setpos;
        }

        #is-pro {
          grid-area: pro;
        }

        #slug {
          grid-area: slug;
        }

        #tickrate-selector {
          grid-area: tick;
        }

        #lineup-image {
          grid-area: lineup;
        }

        #modlabel {
          grid-area: modlabel;
        }

        #status {
          grid-area: status;
        }

        #oneway-selector {
          grid-area: oneway;
        }

        #map-position-selector {
          grid-area: posselector;
        }

        #meta-label {
          grid-area: metalabel;
          align-self: end;
        }

        #preview {
          grid-area: preview;
        }

        #technique-selector {
          grid-area: techsel;
        }

        #movement-selector {
          grid-area: movesel;
        }

        #result-image {
          grid-area: resultimg;
        }

        #description {
          grid-area: desc;
        }

        #end-pos {
          grid-area: endpos;
        }

        #start-pos {
          grid-area: startpos;
        }

        #map-selector {
          grid-area: mapsel;
        }

        #game-selector {
          grid-area: gamemode;
        }

        #gfy-input {
          grid-area: gfyip;
        }

        #media-label {
          grid-area: medialabel;
        }

        #teamside-selector {
          grid-area: teamside;
        }

        #type-selector {
          grid-area: typesel;
        }

        #info-label {
          grid-area: infolabel;
        }

        #preview-label {
          grid-area: previewlabel;
          align-self: end;
        }

        #image-adder,
        #lineup-adder {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 999;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};
