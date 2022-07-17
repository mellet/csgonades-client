import { FC, useMemo } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { TypeSelector } from "./components/NadeInputs/TypeSelector";
import { Dimensions } from "../constants/Constants";
import { BigLabel } from "./components/NadeLabels/BigLabel";
import { GfyInput } from "./components/NadeInputs/GfyInput";
import { MapSelector } from "./components/NadeInputs/MapSelector";
import { ThrownFromInput } from "./components/NadeInputs/ThrownFromInput";
import { EndPosInput } from "./components/NadeInputs/EndPosInput";
import { DescriptionInput } from "./components/NadeInputs/DescriptionInput";
import { ImageSelector } from "./components/NadeInputs/ImageSelector";
import { MovementSelector } from "./components/NadeInputs/MovementSelector";
import { TechniqueSelector } from "./components/NadeInputs/TechniqueSelector";
import { useCreateNadeState, validateState } from "./data/CreateNadeReducer";
import { PreviewNade } from "./components/PreviewNades";
import { ImageUploader } from "./components/NadeInputs/ImageUploader";
import { MapPositionSelectorWrapper } from "./components/MapPositionSelector/MapPositionSelectorWrapper";
import { SumbitBtn } from "./components/NadeInputs/SubmitBtn";
import { NadeApi } from "./data/NadeApi";
import { useDisplayToast } from "../core/toasts/hooks/useDisplayToast";
import { useRouter } from "next/router";
import { SEO } from "../shared-components/SEO";
import { TickrateSelector } from "./components/NadeInputs/TickrateSelector";
import { GuideLines } from "./components/GuideLines";
import { TeamSideSelector } from "./components/NadeInputs/TeamSideSelector";
import { OneWaySelector } from "./components/NadeInputs/OneWaySelector";
import { ImageUploadMessage } from "../shared-components/ImageUploadMessage";
import { ImageResultImageMessage } from "../shared-components/ImageResultImageMessage";
import { useSession } from "../core/authentication/useSession";
import { SetPosInput } from "./components/NadeInputs/SetPosInput";

export const CreateNadeMain: FC = ({}) => {
  const router = useRouter();
  const showToast = useDisplayToast();
  const { isAuthenticated } = useSession();
  const { colors } = useTheme();
  const { state, dispatch, disableSubmit, missingFields } =
    useCreateNadeState();

  const showTickrateSelector = useMemo(() => {
    const isJumpThrow = state.technique?.includes("jumpthrow");

    if (isJumpThrow) {
      return true;
    }
    return false;
  }, [state.technique]);

  async function onSubmit() {
    dispatch({ type: "CreateNade/SetLoading" });
    const validState = validateState(state);

    if (!validState) {
      return dispatch({ type: "CreateNade/SetNotLoading" });
    }

    const body = validState;

    if (!isAuthenticated) {
      dispatch({ type: "CreateNade/SetNotLoading" });
      return showToast({
        severity: "error",
        message:
          "Looks like your not signed in. Try signing out, and then in again.",
        durationSeconds: 15,
      });
    }
    const res = await NadeApi.save(body);

    if (res.isErr()) {
      dispatch({ type: "CreateNade/SetNotLoading" });
      return showToast({
        severity: "error",
        message: `Failed to add nade, check if you forgot to add something. Error: ${res.error.message}`,
        durationSeconds: 20,
      });
    }

    const newNade = res.value;

    showToast({
      severity: "success",
      message:
        "Nade added! A moderator will take a look and accept it if it looks good.",
      durationSeconds: 10,
    });

    dispatch({ type: "CreateNade/SetNotLoading" });

    router.push(`/nades/[nade]`, `/nades/${newNade.id}`);
  }

  return (
    <>
      <SEO title={"Submit nade"} canonical={`/createnade`} />

      <GuideLines />

      <div id="page-wrap">
        <h2 id="title">Submit Nade</h2>
        <div id="create-nade-page">
          <div id="info-label">
            <BigLabel value="Information" />
          </div>

          <div id="map-selector">
            <MapSelector
              onChange={(map) => dispatch({ type: "CreateNade/SetMap", map })}
            />
          </div>

          <div id="gfy-input">
            <GfyInput
              onChange={(data) =>
                dispatch({ type: "CreateNade/SetGfyData", data })
              }
            />
          </div>

          <div id="end-pos">
            <EndPosInput
              onChange={(endPosition) =>
                dispatch({ type: "CreateNade/SetEndPosition", endPosition })
              }
            />
          </div>

          <div id="start-pos">
            <ThrownFromInput
              onChange={(startPosition) =>
                dispatch({ type: "CreateNade/SetStartPosition", startPosition })
              }
            />
          </div>

          <div id="set-pos">
            <SetPosInput
              onChange={(setPos) =>
                dispatch({ type: "CreateNade/SetSetPosition", setPos })
              }
            />
          </div>

          <div id="description">
            <DescriptionInput
              onChange={(description) =>
                dispatch({ type: "CreateNade/SetDescription", description })
              }
            />
          </div>

          <div id="media-label">
            <BigLabel value="Images" />
          </div>

          <div id="result-image">
            <ImageSelector
              label="Result image"
              imageIsSet={!!state.imageBase64}
              onClick={() => dispatch({ type: "CreateNade/ShowImageSelector" })}
            />
          </div>

          <div id="lineup-image">
            <ImageSelector
              label="Line Up Image"
              imageIsSet={!!state.lineUpImageBase64}
              onClick={() =>
                dispatch({ type: "CreateNade/ToggleLineupImageAdder" })
              }
            />
          </div>

          <div id="map-position-selector">
            <MapPositionSelectorWrapper
              map={state.map}
              endPos={state.mapEndCoord}
              onSave={(coords) =>
                dispatch({ type: "CreateNade/SetEndPosCoords", coords })
              }
            />
          </div>

          <div id="meta-label">
            <BigLabel value="Meta Data" />
          </div>

          <div id="type-selector">
            <TypeSelector
              onChange={(nadeType) =>
                dispatch({ type: "CreateNade/SetNadeType", nadeType })
              }
            />
          </div>

          <div id="movement-selector">
            <MovementSelector
              onChange={(movement) =>
                dispatch({ type: "CreateNade/SetMovement", movement })
              }
            />
          </div>

          <div id="technique-selector">
            <TechniqueSelector
              onChange={(technique) =>
                dispatch({
                  type: "CreateNade/SetTechnique",
                  technique,
                })
              }
            />
          </div>

          <div id="oneway-selector">
            <OneWaySelector
              onClick={(oneWay) =>
                dispatch({ type: "CreateNade/SetOneWay", oneWay })
              }
            />
          </div>

          <div id="teamside-selector">
            <TeamSideSelector
              onChange={(side) =>
                dispatch({ type: "CreateNade/SetTeamSide", side })
              }
            />
          </div>

          {showTickrateSelector && (
            <div id="tickrate-selector">
              <TickrateSelector
                onChange={(tick) =>
                  dispatch({ type: "CreateNade/SetTickrate", tick })
                }
              />
            </div>
          )}

          <div id="preview-label">
            <BigLabel value="Preview" />
          </div>

          <div id="preview">
            <PreviewNade nade={state} />
          </div>

          <div id="submit">
            <SumbitBtn
              onSubmit={onSubmit}
              disabled={disableSubmit || state.loading}
            />
            {missingFields.length > 0 && (
              <div className="missing">
                <h4>Missing fields:</h4>
                <ul>
                  {missingFields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {state.showImageAdder && (
            <div id="image-adder">
              <div className="img-add-wrapper">
                <ImageUploader
                  message={<ImageResultImageMessage />}
                  onDismiss={() =>
                    dispatch({ type: "CreateNade/ShowImageSelector" })
                  }
                  onImageCropped={(image) =>
                    dispatch({ type: "CreateNade/SetImage", image })
                  }
                />
              </div>
            </div>
          )}

          {state.showLineUpAdder && (
            <div id="lineup-adder">
              <ImageUploader
                message={<ImageUploadMessage />}
                aspectRatio="16:9"
                onDismiss={() =>
                  dispatch({ type: "CreateNade/ToggleLineupImageAdder" })
                }
                onImageCropped={(img) =>
                  dispatch({ type: "CreateNade/SetLineUpImage", img })
                }
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .missing {
          border: 1px solid red;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.WARNING};
          padding: 6px;
          border-radius: ${Dimensions.BORDER_RADIUS};
          color: white;
        }

        .missing h4 {
          font-size: 16px;
          font-weight: 500;
        }

        .missing ul {
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          list-style: none;
        }

        .missing ul li {
          background: white;
          color: black;
          padding: 3px;
          border-radius: 3px;
          margin-right: 5px;
          margin-bottom: 5px;
        }

        #page-wrap {
          margin: ${Dimensions.GUTTER_SIZE}px;
          margin-top: ${Dimensions.GUTTER_SIZE * 2}px;
        }

        .lineup-msg {
          background: rgba(255, 255, 255, 0.8);
          color: #111;
          border-radius: 5px;
          margin-bottom: 15px;
          padding: 10px;
        }

        #image-adder,
        #lineup-adder {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 1000;
          overflow-y: auto;
        }

        #title {
          color: ${colors.TEXT};
          font-size: 24px;
          padding: 0;
          margin: 0;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        #create-nade-page {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-template-areas:
            "infolabel medialabel"
            "mapsel resultimg"
            "posselector lineup"
            "typesel metalabel"
            "gfyip teamside"
            "endpos movesel"
            "startpos techsel"
            ". tick"
            ". oneway"
            "desc previewlabel"
            "desc preview"
            "desc preview"
            ". submit";
          grid-row-gap: ${Dimensions.GUTTER_SIZE / 1.5}px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          padding: 30px 30px;
          background: ${colors.DP02};
          border-radius: 5px;
          margin-bottom: 150px;
          border: 1px solid ${colors.BORDER};
        }

        #oneway-selector {
          grid-area: oneway;
        }

        #lineup-image {
          grid-area: lineup;
        }

        #tickrate-selector {
          grid-area: tick;
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

        #teamside-selector {
          grid-area: teamside;
        }

        #gfy-input {
          grid-area: gfyip;
        }

        #media-label {
          grid-area: medialabel;
        }

        #type-selector {
          grid-area: typesel;
        }

        #info-label {
          grid-area: infolabel;
        }

        #submit {
          grid-area: submit;
        }

        #preview-label {
          grid-area: previewlabel;
          align-self: end;
        }
      `}</style>
    </>
  );
};
