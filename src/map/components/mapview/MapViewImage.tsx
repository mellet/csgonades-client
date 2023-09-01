import { FC } from "react";
import { CsMap } from "../../models/CsGoMap";
import useImage from "use-image";
import { Image } from "react-konva";

type MapImageProps = {
  csMap: CsMap;
};

export const MapImage: FC<MapImageProps> = ({ csMap }) => {
  const [image] = useImage(`/mapsoverlays/${csMap}.svg`);
  return <Image image={image} width={1024} height={1024} />;
};
