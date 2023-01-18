import { FC } from "react";
import { FaPen, FaSave } from "react-icons/fa";
import { Dimensions } from "../../../../constants/Constants";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Button } from "../../../../shared-components/buttons/Button";
import { ImageFileSelector } from "./ImageFileSelector";

type Props = {
  onFileSelected: (imgSrc: string) => void;
  onSaveCrop: () => void;
  onFileSelectClick: () => void;
  onEditCrop: () => void;
  isSaveEnabled: boolean;
  hasSavedImage: boolean;
};

export const ImageUploaderActionBar: FC<Props> = ({
  onFileSelected,
  onSaveCrop,
  isSaveEnabled,
  onFileSelectClick,
  hasSavedImage,
  onEditCrop,
}) => {
  const { colors } = useTheme();

  const disabled = hasSavedImage ? false : !isSaveEnabled;

  function onClick() {
    if (hasSavedImage) {
      onEditCrop();
    } else {
      onSaveCrop();
    }
  }
  return (
    <>
      <div className="image-uploader-action-bar-container">
        <div className="left"></div>
        <div className="right">
          <ImageFileSelector
            onSetImageSource={onFileSelected}
            onSelectImageClicked={onFileSelectClick}
          />
          <Button
            onClick={onClick}
            title={hasSavedImage ? "Edit crop" : "Save crop"}
            icon={hasSavedImage ? <FaPen /> : <FaSave />}
            disabled={disabled}
          />
        </div>
      </div>
      <style jsx>{`
        .image-uploader-action-bar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;

          background: ${colors.DP02};
          border-bottom: 1px solid ${colors.BORDER};
          padding: ${Dimensions.PADDING_MEDIUM};
        }

        h3 {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          padding: 0;
        }

        .right {
          display: flex;
          gap: ${Dimensions.PADDING_MEDIUM};
        }
      `}</style>
    </>
  );
};
