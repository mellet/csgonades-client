import Link from "next/link";
import { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useCanEditNade } from "../data/useCanEditNade";
import { SquareButton } from "../../shared-components/buttons/IconButton";
import { useTheme } from "styled-components";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";

type Props = {
  nadeId: string;
  nadeSteamId: string;
  nadeSlug?: string;
};

export const NadeEditButton: FC<Props> = ({
  nadeId,
  nadeSteamId,
  nadeSlug,
}) => {
  const canEdit = useCanEditNade(nadeSteamId);
  const { colors } = useTheme();

  if (!canEdit) {
    return null;
  }

  return (
    <Tooltip message="Edit" direction="right">
      <Link href={`/nades/${nadeSlug || nadeId}/edit`}>
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
