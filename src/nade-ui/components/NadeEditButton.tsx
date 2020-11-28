import Link from "next/link";
import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../../nade-data/Nade/Nade";
import { useCanEditNade } from "../../store/NadeStore/hooks/useCanEditNade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  nade: Nade;
};

export const NadeEditButton: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const canEdit = useCanEditNade(nade.steamId);

  if (!canEdit) {
    return null;
  }

  return (
    <>
      <div className="edit">
        <Link
          href="/nades/[...slug]"
          as={`/nades/${nade.slug || nade.id}/edit`}
        >
          <button className="edit-btn">
            <FaEdit /> <span>Edit Nade</span>
          </button>
        </Link>
      </div>
      <style jsx>{`
        .edit-btn {
          width: 100%;
          background: ${colors.filterBg};
          border: none;
          color: white;
          padding: ${Dimensions.GUTTER_SIZE}px;
          outline: none;
          font-size: 16px;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .edit-btn:hover {
          background: ${colors.filterBgHover};
        }

        .edit-btn span {
          margin-left: 4px;
          position: relative;
          top: 2px;
        }
      `}</style>
    </>
  );
};
