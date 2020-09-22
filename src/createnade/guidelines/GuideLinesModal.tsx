import { FC, useState } from "react";
import { Modal } from "semantic-ui-react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const GuideLinesModal: FC = () => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Modal basic open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="guidelines">
          <h2>Guidelines</h2>
          <div className="content">
            <em className="warning">
              Failiure to follow the guidelines will result in the nade not
              getting accepted
            </em>
            <p>
              Hi! So you wan&apos;t to add a nade?
              <br />
              Your going to need:
              <br />
              <b>1.</b> A video of you throwing the nade. (Upload to Gfycat)
              <br />
              <b>2.</b> Screenshot of the result of throwing the nade.
              <br />
            </p>
            <h3>Hard requirements</h3>
            <p>
              <b>No Duplicates</b>
              <br />
              Make sure your not adding a nade that allready is on the site.
              <br />
              If your nade is thrown from a different position or using a
              different line up, that is fine.
            </p>
            <p>
              <b>Aspect ratio</b>
              <br />
              16:9 <em>(Recommended: 1920x1080)</em>
            </p>
            <p>
              <b>No Video Clutter</b>
              <br />
              Remove HUD and net graph while recording.
              <br />
              <code>cl_draw_only_deathnotices 1; net_graph 0;</code>
            </p>
            <p>
              <b>Screenshots</b>
              <br />
              Remove everything before taking a screenshot.
              <br />
              <code>cl_drawhud 0; r_drawviewmodel 0; net_graph 0;</code>
            </p>
            <p>
              <b>Visible Crosshair</b>
              <br />
              Make sure your crosshair is very visisble in the video.
              <br /> Many crosshairs become almost invisible after video
              compression.
              <br />
              <br />I recommend using the crosshair casters use for professional
              live streams:
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
            <button onClick={() => setIsOpen(false)} className="accept">
              I have read and understood the guidelines
            </button>
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .crosshair-example {
          display: block;
          width: 100%;
          border-radius: 5px;
          margin-top: 20px;
          margin-bottom: 20px;
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

        .guidelines {
          margin: 50px auto;
          max-width: 50vw;
          background: ${colors.DP02};
          color: ${colors.TEXT};
          border-radius: 5px;
          overflow: hidden;
        }

        .content {
          padding: 20px 20px;
        }

        h2 {
          background: ${colors.DP01};
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          text-align: center;
          font-size: 24px;
          padding: 10px 20px;
          margin: 0;
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
