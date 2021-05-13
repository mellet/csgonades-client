import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/SettingsHooks";

export const GuideLines: FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <div className="guidelines">
        <h2>Guidelines</h2>
        <div className="content">
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
              <p>- Aspect ratio 16:9</p>
              <p>- Hide any clutter before recording.</p>
              <p>
                <em>
                  Use this command to only show your crosshair in the video:
                </em>
              </p>
              <code>
                cl_draw_only_deathnotices 1; net_graph 0; r_drawviewmodel 1;
              </code>
              <p>Upload to Gfycat after recording and copy the link.</p>
            </div>

            <div className="screenshot-req">
              <p>
                <h3>Screenshots</h3>
                <p>
                  You are going to need two images, one showing the end result
                  and one for how to line it up.
                </p>
                <table className="screenshot-table">
                  <tr>
                    <td width="50%">Result Image Example</td>
                    <td width="50%">Line Up Image Example</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        className="example-img"
                        src="https://storage.googleapis.com/csgonades-3308a.appspot.com/nades/mdwoAZCKZI9NGbdZvi8QG_thumb.jpg"
                      />
                    </td>
                    <td>
                      <img
                        className="example-img"
                        src="https://storage.googleapis.com/csgonades-3308a.appspot.com/lineup/-0tAWSl89Uag7wk2Mobo8.jpg"
                      />
                    </td>
                  </tr>
                </table>
                <p>
                  To get take screenshots you have to hide everything on screen.
                  Paste the following command in your console:
                </p>
                <code>cl_drawhud 0; r_drawviewmodel 0; net_graph 0;</code>
                <p>Then to reset back to normal:</p>
                <code>cl_drawhud 1; r_drawviewmodel 1;</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .guidelines p {
          font-size: 16px;
          margin-bottom: 6px;
        }

        code {
          display: block;
          padding: 6px;
          font-size: 14px;
          border-radius: 5px;
          background: ${colors.DP00};
          margin-bottom: 6px;
        }

        .screenshot-table {
          border-collapse: collapse;
        }
        .screenshot-table td {
          padding-right: 5px;
          padding-bottom: 5px;
          font-weight: 400;
        }

        .example-img {
          max-width: 100%;
        }

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
