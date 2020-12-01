import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const GuideLinesModal: FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <div className="guidelines">
        <h2>Guidelines</h2>
        <div className="content">
          <p>
            Hi! So you wan&apos;t to add a nade?
            <br />
            Your going to need:
            <br />
            <b>1.</b> A video of you throwing the nade. (Upload to Gfycat)
            <br />
            <b>2.</b> Screenshot of you aiming before throwing the nade.
            <br />
            <b>3.</b> Screenshot of the result of throwing the nade.
            <br />
          </p>

          <div className="rules">
            <div className="req">
              <h3>General rules</h3>
              <p>
                <b>No Duplicates</b>
                <br />
                Make sure your not adding a nade that allready is on the site.
                <br />
                If your nade is thrown from a different position or using a
                different line up, that is fine.
              </p>

              <p>
                <b>Crosshair Visibility</b>
                <br />
                Make sure your crosshair is very visisble in the video.
                <br /> Many crosshairs become almost invisible after video
                compression.
                <br />
                <br />I recommend using the crosshair casters use for
                professional live streams:
                <br /> <code>CSGO-aNKFP-FzteR-6uRz5-4WP64-X6urD</code> <br />
                <br />
                <em>
                  Go into Settings and find the Crosshair section.
                  <br />
                  Click &quot;Share or Import&quot; and paste the code above.
                  <br />
                  Remember to backup your own by first clicking &quot;Copy your
                  code&quot; and paste it somewhere you can find it later.
                </em>
                <img
                  className="crosshair-example"
                  src="/images/crosshair_example.jpg"
                />
              </p>
            </div>

            <div className="video-req">
              <h3>Video requirements</h3>
              <p>Aspect ratio of videos must be 16:9</p>
              <p>Hide any clutter before recording:</p>
              <code>cl_drawhud 0; r_drawviewmodel 0; net_graph 0;</code>
            </div>

            <div className="screenshot-req">
              <p>
                <h3>Screenshots</h3>
                <p>Remove everything before taking a screenshot.</p>
                <code>cl_drawhud 0; r_drawviewmodel 0; net_graph 0;</code>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .guidelines {
          color: ${colors.TEXT};
          margin: ${Dimensions.GUTTER_SIZE}px;
        }

        .rules {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: min-content 1fr;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-areas:
            "req videoreq"
            "req ssreq";
        }

        .video-req {
          grid-area: videoreq;
        }

        .req {
          grid-area: req;
        }

        .screenshot-req {
          grid-area: ssreq;
        }

        .req,
        .screenshot-req,
        .video-req {
          padding: 16px;
          border-radius: 5px;
          background: ${colors.DP02};
          border: 1px solid ${colors.BORDER};
        }

        h2 {
          font-size: 24px;
          padding: 0;
          margin: 0;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .crosshair-example {
          display: block;
          max-width: 500px;
          border-radius: 5px;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
        }

        .accept {
          cursor: pointer;
          background: ${colors.filterBg};
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 16px;
          margin: 0 auto;
          display: block;
          border: none;
          outline: none;
        }

        .accept:hover {
          background: ${colors.filterBgHover};
        }

        .warning {
          text-align: center;
          display: block;
          margin-bottom: 10px;
          color: #bbb;
        }

        .code {
          font-size: 14px;
        }

        h3 {
          margin: 0;
          padding: 0;
          margin-bottom: 10px;
          font-size: 22px;
        }
      `}</style>
    </>
  );
};
