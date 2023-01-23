import { FC } from "react";
import { ImageUploader } from "../NadeInputs/ImageUploader/ImageUploader";

type Props = {
  image?: string;
  onSetImage: (image: string) => void;
};

export const NadeEditLineupImage: FC<Props> = ({ onSetImage, image }) => {
  return (
    <>
      <ImageUploader
        previewImageUrl={image}
        onImageCropped={onSetImage}
        showCrosshair
      />
      <style jsx>{``}</style>
    </>
  );
};
