import { FC } from "react";
import { ImageUploader } from "../NadeInputs/ImageUploader/ImageUploader";

type Props = {
  image?: string;
  onSetImage: (image: string) => void;
};

export const NadeEditResultImage: FC<Props> = ({ onSetImage, image }) => {
  return (
    <>
      <ImageUploader previewImageUrl={image} onImageCropped={onSetImage} />
      <style jsx>{``}</style>
    </>
  );
};
