import { FC } from "react";

type Props = {
  imageSrc: string;
};

export const ImagePreview: FC<Props> = ({ imageSrc }) => {
  return (
    <>
      <div className="image-preview-container">
        <img src={imageSrc} />
        <p className="preview-label">Preview</p>
      </div>
      <style jsx>{`
        .image-preview-container {
          position: relative;
        }

        .preview-label {
          position: absolute;
          top: 50%;
        }

        img {
          width: 100%;
          display: inline-block;
        }
      `}</style>
    </>
  );
};
