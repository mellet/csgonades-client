import { FC, useState } from "react";
import { Button, Input, Message } from "semantic-ui-react";
import { NadeApi } from "../nade-data/NadeApi";
import { GfycatData } from "../nade-data/Nade/GfycatData";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { cleanGfycatUrl } from "../utils/Common";

type Props = {
  addGfycat: (gfyId: GfycatData) => void;
  clearError: () => void;
  onError: (error: string) => void;
};

export const AddGfycat: FC<Props> = ({ addGfycat, clearError, onError }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [gfyValue, setGfyValue] = useState("");

  async function verify() {
    setLoading(true);
    clearError();
    const cleanId = cleanGfycatUrl(gfyValue);

    const gfyResult = await NadeApi.validateGfycat(cleanId);

    if (gfyResult.isErr()) {
      onError("Can't find the gfycat or gfycat.com might be down.");
      setLoading(false);
      return;
    }

    const gfyData = gfyResult.value;
    setLoading(false);
    addGfycat(gfyData);
  }

  return (
    <>
      <div className="add-gfycat">
        <h2>Gfycat</h2>
        <Message info>
          <h3>Important</h3>
          <h4>Hide HUD (Required)</h4>
          <code>sv_cheats 1; cl_draw_only_deathnotices 1</code>
          <h4>Recording the nade landing (Optional)</h4>
          <p>
            Noclip to a nice position where you want to observe the nade
            landing, open your console and do the following:
          </p>
          <code>getpos</code>
          <br />
          <code>
            <em>
              setpos 100.0 -200.0 -300.0;{" "}
              <span className="highlight">setang 10.0 -20.0</span>;
            </em>{" "}
            // Copy setang
          </code>
          <br />

          <code>getpos_exact</code>
          <br />
          <code>
            <em>
              <span className="highlight-2">
                setpos_exact 100.0 -200.0 -300.0
              </span>
              ; setang_exact 10.0 -20.0
            </em>{" "}
            // Copy setpos_exact
          </code>
          <br />

          <br />
          <code>
            bind pgdn &quot;
            <span className="highlight-2">
              setpos_exact 100.0 -200.0 -300.0
            </span>
            ;<span className="highlight">setang 10.0 -20.0</span>;
            cl_draw_only_deathnotices 1; cl_drawhud 0; r_drawviewmodel 0;&quot;
          </code>
          <p>
            Clicking &apos;PAGE DOWN&apos; on your keyboard will now teleport to
            the location you choose and hide everything for a clean recording of
            the nade landing.
          </p>

          <h4>Reset command</h4>
          <code>
            r_drawviewmodel 1; cl_draw_only_deathnotices 1; cl_drawhud 1
          </code>
        </Message>
        <div className="input">
          <Input
            fluid
            label="Gfycat Url"
            loading={loading}
            value={gfyValue}
            onChange={(e) => {
              setGfyValue(e.target.value);
            }}
          />
        </div>

        <Button positive loading={loading} onClick={verify}>
          Verify
        </Button>
      </div>
      <style jsx>{`
        h2 {
          color: ${colors.TEXT};
        }

        .input {
          max-width: 500px;
          margin-bottom: 12px;
        }

        .highlight {
          color: maroon;
        }
        .highlight-2 {
          color: orange;
        }
      `}</style>
    </>
  );
};
