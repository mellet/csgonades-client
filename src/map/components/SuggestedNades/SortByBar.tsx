import { FC } from "react";
import { FaRocket, FaEye } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { ImStarFull } from "react-icons/im";
import { NadeLightSort } from "../../../nade/models/Nade";
import { IconButtonGroup } from "../../../shared-components/buttons/IconButtonGroup.tsx/IconButtonGroup";
import { ButtonWithIcon } from "../../../shared-components/buttons/ButtonWithIcon";

type Props = {
  sortBy: NadeLightSort;
  setSortBy: (sortBy: NadeLightSort) => void;
};

export const SortByBar: FC<Props> = ({ sortBy, setSortBy }) => {
  return (
    <>
      <div className="sorthing-method-selector">
        <IconButtonGroup>
          <ButtonWithIcon
            value="Hot"
            icon={<FaRocket />}
            onClick={() => setSortBy("score")}
            active={sortBy === "score"}
          />
          <ButtonWithIcon
            value="Top"
            icon={<ImStarFull />}
            onClick={() => setSortBy("favoriteCount")}
            active={sortBy === "favoriteCount"}
          />
          <ButtonWithIcon
            value="View"
            icon={<FaEye />}
            onClick={() => setSortBy("viewCount")}
            active={sortBy === "viewCount"}
          />
          <ButtonWithIcon
            value="New"
            icon={<MdFiberNew />}
            onClick={() => setSortBy("createdAt")}
            active={sortBy === "createdAt"}
          />
        </IconButtonGroup>
      </div>

      <style jsx>{`
        .sorthing-method-selector {
          display: inline-flex;
        }
      `}</style>
    </>
  );
};
