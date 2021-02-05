import Link from "next/link";
import { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../models/Nade";
import { useCanEditNade } from "../data/useCanEditNade";
import { IconButton } from "../../shared-components/buttons/IconButton";
import { useTheme } from "styled-components";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";

type Props = {
  nade: Nade;
};

export const NadeEditButton: FC<Props> = ({ nade }) => {
  const canEdit = useCanEditNade(nade.steamId);
  const { colors } = useTheme();

  if (!canEdit) {
    return null;
  }

  return (
    <>
      <div className="edit">
        <Tooltip message="Edit" direction="bottom">
          <Link href={`/nades/${nade.slug || nade.id}/edit`}>
            <IconButton
              icon={<FaPencilAlt />}
              active={false}
              activeColor={colors.SUCCESS}
            />
          </Link>
        </Tooltip>
      </div>
      <style jsx>{`
        .edit {
          margin-left: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
