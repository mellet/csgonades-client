import Link from "next/link";
import { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { Nade } from "../models/Nade";
import { useCanEditNade } from "../data/useCanEditNade";
import { SquareButton } from "../../shared-components/buttons/IconButton";
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
    <Tooltip message="Edit" direction="right">
      <Link href={`/nades/${nade.slug || nade.id}/edit`}>
        <a>
          <SquareButton
            icon={<FaPencilAlt />}
            active={false}
            activeColor={colors.SUCCESS}
          />
        </a>
      </Link>
    </Tooltip>
  );
};
