import { FC } from "react";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { useRouter } from "next/router";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import Link from "next/link";

type Props = {
  map: CsgoMap;
  isNew?: boolean;
  isUpdated?: boolean;
};

const HARD_LINK = true;

export const MapLink: FC<Props> = ({ map, isNew, isUpdated }) => {
  const { colors } = useTheme();
  const { query } = useRouter();
  const selected = query.map ? query.map.includes(map) : false;
  const labelString = createLabelString(isNew, isUpdated);
  const showLabel = isNew || isUpdated;

  if (HARD_LINK) {
  }

  return (
    <>
      {HARD_LINK && (
        <li className={selected ? "nav-selected" : ""}>
          {showLabel && <span className="new-map">{labelString}</span>}
          <a href={`/maps/${map}`}>
            <span className="map-name">{capitalize(map)}</span>
          </a>
        </li>
      )}
      {!HARD_LINK && (
        <li className={selected ? "nav-selected" : ""}>
          {showLabel && <span className="new-map">{labelString}</span>}
          <Link href="/maps/[map]" as={`/maps/${map}`}>
            <a>
              <span className="map-name">{capitalize(map)}</span>
            </a>
          </Link>
        </li>
      )}

      <style jsx>{`
        li {
          position: relative;
          overflow: hidden;
        }

        li .map-name {
          display: block;
          color: ${colors.TEXT};
          min-width: 90px;
          font-size: 16px;
          padding: 10px 20px 10px 20px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          margin-top: 5px;
          transition: background 0.2s;
        }

        .new-map {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 8px;
          background: rgba(127, 176, 2, 0.7);
          color: white;
          border-radius: 2px;
          padding: 0px 2px;
          display: block;
          margin-top: 2px;
          margin-right: 2px;
          pointer-events: none;
          font-weight: 400;
        }

        li:hover .map-name {
          text-decoration: underline;
        }

        .nav-selected .map-name {
          font-weight: 400;
        }
      `}</style>
    </>
  );
};

function createLabelString(isNew?: boolean, isUpdated?: boolean) {
  if (isNew) {
    return "New";
  }
  if (isUpdated) {
    return "Update";
  }
  return "";
}
