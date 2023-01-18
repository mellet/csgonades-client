import { FC, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import { Button } from "../../../../shared-components/buttons/Button";

type Props = {
  onSetImageSource: (imageSource: string) => void;
  onSelectImageClicked: () => void;
  label?: string;
  primary?: boolean;
};

export const ImageFileSelector: FC<Props> = ({
  onSetImageSource,
  onSelectImageClicked,
  label,
  primary,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        onSetImageSource(reader.result?.toString() || "")
      );
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      reader.readAsDataURL(file);
    }
  }

  function onSelectFileClick() {
    onSelectImageClicked();
    fileInputRef.current?.click();
  }

  return (
    <>
      <div className="image-file-selector-container">
        <input
          hidden
          ref={fileInputRef}
          type="file"
          accept="image/jpeg"
          onChange={onSelectFile}
        />
        <Button
          onClick={onSelectFileClick}
          icon={<FaRegImage style={{ position: "relative", top: 1 }} />}
          title={label}
          primary={primary}
        />
      </div>
      <style jsx>{``}</style>
    </>
  );
};
