import { FC } from "react";
import { Message } from "semantic-ui-react";
import { useNewNade } from "../../store/NewNadeStore/NewNadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { ImageUploader } from "./ImageUploader";

export const AddImage: FC = () => {
  const { colors } = useTheme();

  const { addImage, loading } = useNewNade();

  return (
    <>
      <div className="add-img">
        <h2>Result image</h2>
        <Message info>
          <h3>Important</h3>
          <p>Hide everything for the screenshot:</p>
          <code>
            sv_cheats 1; r_drawviewmodel 0; cl_draw_only_deathnotices 1
          </code>
        </Message>
        <ImageUploader loading={loading} onImageCropped={addImage} />
      </div>
      <style jsx>{`
        h2 {
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
