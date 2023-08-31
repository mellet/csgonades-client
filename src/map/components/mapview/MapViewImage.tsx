import { FC } from "react";
import { CsMap } from "../../models/CsGoMap";
import useImage from "use-image";
import { Image } from "react-konva";

type MapImageProps = {
  csMap: CsMap;
};

export const MapImage: FC<MapImageProps> = ({ csMap }) => {
  const format = mapFormatPicker(csMap);

  const [image] = useImage(`/mapsoverlays/${csMap}${format}`);
  return <Image image={image} width={1024} height={1024} />;
};

function mapFormatPicker(csMap: CsMap) {
  if (csMap === "overpass" || csMap === "ancient" || csMap === "nuke") {
    return ".svg";
  }

  return ".jpg";
}
