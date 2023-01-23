import { FC } from "react";

type Props = {
  imageSrc: string;
};

export const ImagePreview: FC<Props> = ({ imageSrc }) => {
  return (
    <>
      <div className="image-preview-container">
        <img src={imageSrc} />
        <div className="preview-label">
          <span>Preview</span>
        </div>
      </div>
      <style jsx>{`
        .image-preview-container {
          position: relative;
        }

        .preview-label {
          position: absolute;
          top: 0;
          right: 0;
          width: 25%;
          height: 25%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-label span {
          font-size: 50px;
          color: white;
          opacity: 0.1;
        }

        img {
          width: 100%;
          display: inline-block;
        }
      `}</style>
    </>
  );
};
