import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { FaChevronLeft } from "react-icons/fa";
import { TitleFavBtn } from "./TitleFavBtn";
import { TitleReportBtn } from "./TileReportBtn";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";
import Link from "next/link";

type Props = {
  map?: CsgoMap;
  nadeId: string;
  subTitle?: string;
  title: string;
};

export const NadeTitle: FC<Props> = memo(({ title, subTitle, nadeId, map }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="title">
        <div id="left-controls">
          {!!map && (
            <Link href={`/maps/${map}`}>
              <button id="back">
                <FaChevronLeft />
              </button>
            </Link>
          )}
        </div>

        <div id="actions">
          <TitleReportBtn nadeId={nadeId} />
          <TitleFavBtn nadeId={nadeId} />
        </div>

        <h1 className="nade-title">
          <span className="main-title">
            {title} {subTitle}
          </span>
        </h1>
      </div>

      <style jsx>{`
        .title {
          position: relative;
          display: grid;
          grid-template-columns: min-content min-content 1fr min-content;
          grid-template-areas:
            "controls title . actions"
            "controls title . actions";
          width: 100%;
          padding: 16px;
        }

        #left-controls {
          grid-area: controls;
          align-self: center;
        }

        #actions {
          grid-area: actions;
          align-self: center;
          display: flex;
        }

        #back {
          color: ${colors.TEXT};
          font-size: 30px;
          display: block;
          position: relative;
          top: -2px;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          margin: 0;
          padding: 0;
          display: block;
          width: 30px;
          height: 24px;
          margin-right: 12px;
        }

        .nade-title {
          grid-area: title;
          align-self: center;
        }

        h1 {
          font-size: 26px;
          margin: 0;
          padding: 0;
          font-weight: 300;
          color: ${colors.TEXT};
          white-space: nowrap;
        }

        @media only screen and (max-width: 700px) {
          .title {
            grid-template-columns: 50px 1fr 50px;
            grid-template-areas:
              "controls title actions"
              "controls title actions";
            padding-left: 10px;
            padding-right: 10px;
          }
        }

        @media only screen and (max-width: 600px) {
          .main-title {
            font-size: 20px;
          }

          .sub-title {
            font-size: 12px;
            opacity: 0.75;
            margin-top: -8px;
          }
        }

        @media only screen and (max-width: 500px) {
          .title {
            grid-template-columns: 30px 1fr 30px;
            grid-template-areas:
              "controls title actions"
              "controls title actions";
            padding-left: 10px;
            padding-right: 10px;
          }

          #actions {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
