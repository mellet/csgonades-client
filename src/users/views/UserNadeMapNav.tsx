import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { CsgoMap } from "../../map/models/CsGoMap";
import { UserNadeMapNavItem } from "./UserNadeMapNavItem";

type Props = {
  selectedMap: CsgoMap;
  onMapSelect: (csgoMap: CsgoMap) => void;
};

export const UserNadeMapNav: FC<Props> = ({ onMapSelect, selectedMap }) => {
  return (
    <>
      <div className="user-nade-map-nav">
        <UserNadeMapNavItem
          map="mirage"
          onClick={onMapSelect}
          active={selectedMap === "mirage"}
        />
        <UserNadeMapNavItem
          map="inferno"
          onClick={onMapSelect}
          active={selectedMap === "inferno"}
        />
        <UserNadeMapNavItem
          map="dust2"
          onClick={onMapSelect}
          active={selectedMap === "dust2"}
        />
        <UserNadeMapNavItem
          map="overpass"
          onClick={onMapSelect}
          active={selectedMap === "overpass"}
        />
        <UserNadeMapNavItem
          map="nuke"
          onClick={onMapSelect}
          active={selectedMap === "nuke"}
        />
        <UserNadeMapNavItem
          map="vertigo"
          onClick={onMapSelect}
          active={selectedMap === "vertigo"}
        />
        <UserNadeMapNavItem
          map="ancient"
          onClick={onMapSelect}
          active={selectedMap === "ancient"}
        />
        <UserNadeMapNavItem
          map="cache"
          onClick={onMapSelect}
          active={selectedMap === "cache"}
        />
        <UserNadeMapNavItem
          map="train"
          onClick={onMapSelect}
          active={selectedMap === "train"}
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
