import Link from "next/link";
import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { Nade } from "../models/Nade";
import { useCanEditNade } from "../data/useCanEditNade";
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
        <Link href={`/nades/${nade.slug || nade.id}/edit`}>
          <button className="edit-btn">
            <FaEdit /> <span>Edit Nade</span>
          </button>
        </Link>
      </div>
      <style jsx>{`
        .edit {
          width: 100%;
          background: ${colors.filterBg};
        }

        .edit-btn {
          background: transparent;
          border: none;
          color: white;
          padding: 8px ${Dimensions.GUTTER_SIZE}px;
          outline: none;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0;
          width: 100%;
        }

        .edit-btn:hover {
          background: ${colors.filterBgHover};
        }

        .edit-btn span {
          margin-left: 4px;
          position: relative;
          top: 1px;
        }
      `}</style>
    </>
  );
};
