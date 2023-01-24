import Link from "next/link";
import { FC } from "react";
import { useTheme } from "../core/settings/SettingsHooks";
import { NadeType } from "../nade/models/NadeType";

type Props = {
  nadeType: NadeType;
};

export const FrontPageMapSelector: FC<Props> = ({ nadeType, children }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="nadetype">
        {children}
        <div className="map-selector">
          <span>Select map:</span>
          <div className="maps">
            <Link href={`/maps/mirage?type=${nadeType}`} legacyBehavior>
              <a>Mirage</a>
            </Link>
            <Link href={`/maps/inferno?type=${nadeType}`} legacyBehavior>
              <a>Inferno</a>
            </Link>
            <Link href={`/maps/dust2?type=${nadeType}`} legacyBehavior>
              <a>Dust2</a>
            </Link>
          </div>
          <div className="maps">
            <Link href={`/maps/overpass?type=${nadeType}`} legacyBehavior>
              <a>Overpass</a>
            </Link>
            <Link href={`/maps/ancient?type=${nadeType}`} legacyBehavior>
              <a>Ancient</a>
            </Link>
            <Link href={`/maps/nuke?type=${nadeType}`} legacyBehavior>
              <a>Nuke</a>
            </Link>
          </div>
          <div className="maps">
            <Link href={`/maps/vertigo?type=${nadeType}`} legacyBehavior>
              <a>Vertigo</a>
            </Link>
            <Link href={`/maps/train?type=${nadeType}`} legacyBehavior>
              <a>Train</a>
            </Link>
            <Link href={`/maps/cache?type=${nadeType}`} legacyBehavior>
              <a>Cache</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .nadetype {
          position: relative;
        }

        .nadetype:hover .map-selector {
          display: flex;
        }

        .map-selector {
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid ${colors.BORDER};
          padding: 10px 14px;
          position: absolute;
          top: 50%;
          left: 50%;
          display: none;
          flex-direction: column;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
          z-index: 500;
          width: 250px;
        }

        span {
          font-weight: 500;
          font-size: 15px;
          color: white;
        }

        .maps {
          display: flex;
          margin-top: 8px;
        }

        a {
          white-space: nowrap;
          font-size: 14px;
          margin-right: 10px;
          flex: 1;
          background: #ccc;
          padding: 2px;
          border-radius: 3px;
          color: white;
          background: #383838;
          text-align: center;
        }

        a:last-child {
          margin-right: 0;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
