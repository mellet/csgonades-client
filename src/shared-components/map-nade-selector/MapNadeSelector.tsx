import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { CsgoMap } from "../../map/models/CsGoMap";
import { MapNadeSelectorItem } from "./MapNadeSelectorItem";

type Props = {
  selectedMap: CsgoMap;
  onMapSelect: (csgoMap: CsgoMap) => void;
};

export const MapNadeSelector: FC<Props> = ({ onMapSelect, selectedMap }) => {
  return (
    <>
      <div className="user-nade-map-nav">
        <MapNadeSelectorItem
          map="mirage"
          onClick={onMapSelect}
          active={selectedMap === "mirage"}
        />
        <MapNadeSelectorItem
          map="inferno"
          onClick={onMapSelect}
          active={selectedMap === "inferno"}
        />
        <MapNadeSelectorItem
          map="dust2"
          onClick={onMapSelect}
          active={selectedMap === "dust2"}
        />
        <MapNadeSelectorItem
          map="overpass"
          onClick={onMapSelect}
          active={selectedMap === "overpass"}
        />
        <MapNadeSelectorItem
          map="nuke"
          onClick={onMapSelect}
          active={selectedMap === "nuke"}
        />
        <MapNadeSelectorItem
          map="vertigo"
          onClick={onMapSelect}
          active={selectedMap === "vertigo"}
        />
        <MapNadeSelectorItem
          map="ancient"
          onClick={onMapSelect}
          active={selectedMap === "ancient"}
        />
        <MapNadeSelectorItem
          map="cache"
          onClick={onMapSelect}
          active={selectedMap === "cache"}
        />
        <MapNadeSelectorItem
          map="train"
          onClick={onMapSelect}
          active={selectedMap === "train"}
        />
        <MapNadeSelectorItem
          map="tuscan"
          onClick={onMapSelect}
          active={selectedMap === "tuscan"}
        />

        <MapNadeSelectorItem
          map="anubis"
          onClick={onMapSelect}
          active={selectedMap === "anubis"}
        />
        <MapNadeSelectorItem
          map="cobblestone"
          onClick={onMapSelect}
          active={selectedMap === "cobblestone"}
        />
      </div>
      <style jsx>{`
        .user-nade-map-nav {
          display: flex;
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
};
