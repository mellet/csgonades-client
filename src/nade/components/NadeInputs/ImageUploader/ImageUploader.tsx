/* eslint-disable @next/next/no-img-element */
import { useState, FC, useCallback } from "react";
import { useTheme } from "../../../../core/settings/SettingsHooks";
import { Dimensions } from "../../../../constants/Constants";
import "react-image-crop/dist/ReactCrop.css";
import { NoImage } from "./NoImage";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import getCroppedImg from "./cropImage";
import { ImagePreview } from "./ImagePreview";
import { ImageUploaderActionBar } from "./ImageUploaderActionBar";
import { ZoomControl } from "./ZoomControl";
import { CrosshairOverlay } from "../../VideoContainer/CrosshairOverlay";

type Props = {
  previewImageUrl?: string;
  onImageCropped: (croppedImageBase64: string) => void;
  showCrosshair?: boolean;
};

export const ImageUploader: FC<Props> = ({
  onImageCropped,
  previewImageUrl,
  showCrosshair,
}: Props) => {
  const { colors } = useTheme();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [imgSrc, setImgSrc] = useState<string | undefined>();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(
    previewImageUrl || null
  );

  const editCrop = useCallback(() => {
    setCroppedAreaPixels(null);
    setCroppedImage(null);
  }, []);

  const onImageSelected = useCallback((img: string) => {
    setCroppedImage(null);
    setImgSrc(img);
  }, []);

  const onFileSelectClick = useCallback(() => {
    setImgSrc(undefined);
    setCroppedImage(null);
  }, []);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    if (!imgSrc || !croppedAreaPixels) {
      return;
    }
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels);
      if (croppedImage) {
        setCroppedImage(croppedImage);
        onImageCropped(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, imgSrc, onImageCropped]);

  const hasSavedImage = Boolean(croppedImage);
  const hasSelectedFile = Boolean(imgSrc);
  const isEditing = !hasSavedImage && hasSelectedFile;

  return (
    <>
      <div className="image-uploader-container">
        <div className="image-uploader-actions">
          <ImageUploaderActionBar
            onFileSelected={onImageSelected}
            onSaveCrop={showCroppedImage}
            onFileSelectClick={onFileSelectClick}
            isSaveEnabled={isEditing}
            onEditCrop={editCrop}
            hasSavedImage={hasSavedImage}
          />
        </div>
        <div className="image-uploader">
          <div className="image-uploader-content">
            {!isEditing && !hasSavedImage && <NoImage />}
            {isEditing && (
              <div className="cropper-controls">
                <ZoomControl currentZoom={zoom} onZoomChange={setZoom} />
              </div>
            )}
            {isEditing && (
              <Cropper
                image={imgSrc}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: {
                    background: "rgba(0,0,0,0.5)",
                  },
                }}
              />
            )}

            {croppedImage && <ImagePreview imageSrc={croppedImage} />}
            {showCrosshair && (isEditing || hasSavedImage) && (
              <CrosshairOverlay />
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .image-uploader-container {
          position: relative;
          background: ${colors.DP02};
          border: 1px solid ${colors.BORDER};
          border-top-left-radius: ${Dimensions.BORDER_RADIUS};
          border-top-right-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
        }

        .image-uploader {
          position: relative;
          padding-top: calc(9 / 16 * 100%);
        }

        .image-uploader-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .cropper-controls {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: ${Dimensions.PADDING_SMALL} ${Dimensions.PADDING_MEDIUM};
          display: flex;
          justify-content: center;
          z-index: 999;
        }
      `}</style>
    </>
  );
};
