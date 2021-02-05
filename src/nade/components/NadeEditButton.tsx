import Link from "next/link";
import { FC } from "react";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../models/Nade";
import { useCanEditNade } from "../data/useCanEditNade";
import { IconButton } from "../../shared-components/buttons/IconButton";

type Props = {
  nade: Nade;
};

export const NadeEditButton: FC<Props> = ({ nade }) => {
  const canEdit = useCanEditNade(nade.steamId);

  if (!canEdit) {
    return null;
  }

  return (
    <>
      <div className="edit">
        <Link href={`/nades/${nade.slug || nade.id}/edit`}>
          <IconButton
            icon={<FaPencilAlt />}
            active={false}
            activeColor={"blue"}
          />
        </Link>
      </div>
      <style jsx>{`
        .edit {
          margin-left: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
