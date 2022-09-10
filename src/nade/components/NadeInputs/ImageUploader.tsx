import { ChangeEvent, useRef, useState, FC } from "react";
import ReactCrop from "react-image-crop";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { Dimensions } from "../../../constants/Constants";
import { useWindowSize } from "../../../shared-components/MinSizeRender";
import "react-image-crop/dist/ReactCrop.css";

type AspectRatio = "1:1" | "16:9";

type Props = {
  previewImageUrl?: string;
  aspectRatio?: AspectRatio;
  message: any;
  onDismiss: () => void;
  onImageCropped: (croppedImageBase64: string) => void;
};

export const ImageUploader: FC<Props> = ({
  aspectRatio,
  message,
  onDismiss,
  onImageCropped,
  previewImageUrl,
}: Props) => {
  const windowSize = useWindowSize();
  const { colors } = useTheme();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [crop, setCrop] = useState<ReactCrop.Crop>({
    aspect: aspectRatio === "1:1" ? 1 / 1 : 16 / 9,
    unit: "%",
    width: 100,
  });

  function onSelectFileClick() {
    fileInputRef.current?.click();
  }

  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      function onReaderImageLoaded() {
        setImageSrc(reader.result as string);
      }

      reader.addEventListener("load", onReaderImageLoaded);
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  function onImageLoaded(image: HTMLImageElement) {
    setImage(image);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onCropComplete(_: ReactCrop.Crop, __: ReactCrop.PercentCrop) {
    // @no-op
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onCropChange(crop: ReactCrop.Crop, _: ReactCrop.PercentCrop) {
    setCrop(crop);
  }

  function cropImage() {
    if (!image) {
      console.error("No image");
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width || 0;
    canvas.height = crop.height || 0;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("CTX err", ctx);
      return;
    } else if (crop.x === undefined) {
      console.error("crop x err", crop);
      return;
    } else if (crop.y === undefined) {
      console.error("crop y err", crop);
      return;
    } else if (crop.width === undefined) {
      console.error("crop width err", crop);
      return;
    } else if (crop.height === undefined) {
      console.error("crop height err", crop);
      return;
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg", 1);

    onImageCropped(base64Image);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Failed to load image blob");
            return reject("Failed to load image blob");
          }
          // @ts-ignore
          blob.name = "test";
          resolve(blob);
        },
        "image/jpeg",
        1
      );
    });
  }

  return (
    <>
      <div className="image-uploader">
        <input
          hidden
          ref={fileInputRef}
          type="file"
          accept="image/jpeg"
          onChange={onSelectFile}
        />

        <div className="file-selector-btn">
          <button className="btn cancel" onClick={onDismiss}>
            Cancel
          </button>
          <button className="btn select-img" onClick={onSelectFileClick}>
            {!previewImageUrl ? "Upload image" : "Replace Image"}
          </button>

          {!!image && (
            <>
              <button className="btn save" onClick={cropImage}>
                Save
              </button>
            </>
          )}
        </div>

        {!image && !previewImageUrl && (
          <div className="placeholder">
            <div className="message">{message}</div>
          </div>
        )}

        {!!previewImageUrl && !image && (
          <div className="preview-image">
            <div className="tip">Current Image</div>
            <img src={previewImageUrl} />
          </div>
        )}

        <ReactCrop
          src={imageSrc}
          crop={crop}
          minWidth={620}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
          ruleOfThirds
        />
      </div>
      <style jsx>{`
        .preview-image {
          position: relative;
          width: 100%;
          background: rgba(255, 255, 255, 0.5);
          margin-top: 20px;
          border-radius: 5px;
          opacity: 1;
          overflow: hidden;
        }

        .tip {
          text-align: center;
          font-size: 18px;
          padding: 5px;
          color: white;
        }

        .preview-image img {
          width: 100%;
          display: block;
        }

        .placeholder {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          background: rgba(255, 255, 255, 0.5);
          margin-top: 20px;
          border-radius: 5px;
        }

        .btn {
          border: none;
          outline: none;
          font-size: 14px;
          background: ${colors.filterBg};
          cursor: pointer;
          margin-right: ${Dimensions.GUTTER_SIZE}px;
          color: white;
          border-radius: 5px;
          height: 42px;
          padding: 0px 20px;
        }

        .btn:hover {
          background: ${colors.filterBgHover};
        }

        .save {
          background: #94b83b;
        }

        .cancel {
          background: ${colors.ERROR};
          color: white;
          opacity: 0.8;
        }

        .cancel:hover {
          background: ${colors.ERROR};
          opacity: 1;
        }

        .save:hover {
          background: #7d9c32;
        }

        .image-uploader {
          padding-top: ${Dimensions.GUTTER_SIZE}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE}px;
          display: block;
          width: ${windowSize[0] / 1.08}px;
          margin: 0 auto;
        }

        .message {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-selector-btn {
          margin-bottom: 12px;
          display: flex;
        }
      `}</style>
    </>
  );
};
