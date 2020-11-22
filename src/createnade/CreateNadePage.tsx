import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { PageCentralize } from "../common/PageCentralize";
import { TypeSelector } from "./components/TypeSelector";
import { Dimensions } from "../constants/Constants";
import { BigLabel } from "./components/BigLabel";
import { GfyInput } from "./components/GfyInput";
import { MapSelector } from "./components/MapSelector";
import { ThrownFromInput } from "./components/ThrownFromInput";
import { EndPosInput } from "./components/EndPosInput";
import { DescriptionInput } from "./components/DescriptionInput";
import { ImageSelector } from "./components/ImageSelector";
import { MovementSelector } from "./components/MovementSelector";
import { TechniqueSelector } from "./components/TechniqueSelector";
import { useCreateNadeState, validateState } from "./CreateNadeReducer";
import { PreviewNade } from "./PreviewNades";
import { ImageUploader } from "../newnade/ImageUploader";
import { MapPositionEditor } from "../nade-ui/components/MapPositionEditor";
import { SumbitBtn } from "./components/SubmitBtn";
import { NadeApi } from "../nade-data/NadeApi";
import { useGetOrUpdateToken } from "../store/AuthStore/hooks/useGetToken";
import { useDisplayToast } from "../store/ToastStore/hooks/useDisplayToast";
import { useRouter } from "next/router";
import { SEO } from "../layout/SEO";
import { TickrateSelector } from "./components/TickrateSelector";
import { GuideLinesModal } from "./guidelines/GuideLinesModal";

export const CreateNadePage: FC = ({}) => {
  const router = useRouter();
  const showToast = useDisplayToast();
  const getToken = useGetOrUpdateToken();
  const { colors } = useTheme();
  const { state, dispatch, disableSubmit } = useCreateNadeState();

  async function onSubmit() {
    dispatch({ type: "CreateNade/SetLoading" });
    const validState = validateState(state);

    if (!validState) {
      return dispatch({ type: "CreateNade/SetNotLoading" });
    }

    const body = validState;
    const token = await getToken();

    if (!token) {
      dispatch({ type: "CreateNade/SetNotLoading" });
      return showToast({
        severity: "error",
        message:
          "Looks like your not signed in. Try signing out, and then in again.",
        durationSeconds: 15,
      });
    }
    const res = await NadeApi.save(body, token);

    if (res.isErr()) {
      console.error(res.error);
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
      <PageCentralize>
        <SEO title={"Submit nade"} canonical={`/createnade`} />

        <h1 id="title">SUBMIT NADE</h1>
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
              optional
              label="Line Up Image"
              imageIsSet={!!state.lineUpImageBase64}
              onClick={() =>
                dispatch({ type: "CreateNade/ToggleLineupImageAdder" })
              }
            />
          </div>

          <div id="map-position-selector">
            <MapPositionEditor
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

          {state.technique === "jumpthrow" && (
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
          </div>

          {state.showImageAdder && (
            <div id="image-adder">
              <div className="img-add-wrapper">
                <ImageUploader
                  message={<></>}
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
                message={
                  <div className="lineup-msg">
                    <h3>Guideline</h3>
                    <ul>
                      <li>Image must be 16:9 aspect ratio</li>
                      <li>Aim at the position</li>
                      <li>
                        Remove your hud (cl_drawhud 0; r_drawviewmodel 0;)
                      </li>
                      <li>Take screenshot</li>
                    </ul>
                    <p>
                      Don&apos;t resize the image. Keep it as it is. A crosshair
                      will be added in the middle of the image automatically.
                    </p>
                    <p>
                      If you must, you can draw anything on the image in your
                      own software, just don&apos;t resize the image.
                    </p>
                  </div>
                }
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
      </PageCentralize>

      <GuideLinesModal />

      <style jsx>{`
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
          background: ${colors.DP01};
          color: ${colors.TEXT};
          font-size: 24px;
          padding: 15px 30px;
          margin: 0;
          display: block;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
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
            "gfyip movesel"
            "endpos techsel"
            "startpos tick"
            "desc previewlabel"
            "desc preview"
            "desc preview"
            ". submit";
          grid-row-gap: ${Dimensions.GUTTER_SIZE / 1.5}px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          padding: 30px 30px;
          background: ${colors.DP02};
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          margin-bottom: 150px;
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
