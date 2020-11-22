import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import Link from "next/link";
import { FaEdit, FaChevronLeft } from "react-icons/fa";
import { TitleFavBtn } from "./TitleFavBtn";
import { TitleReportBtn } from "./TileReportBtn";
import { CsgoMap } from "../../nade-data/Nade/CsGoMap";

type Props = {
  inModal?: boolean;
  nadeId: string;
  nadeSlug?: string;
  title: string;
  subTitle?: string;
  canEdit?: boolean;
  map?: CsgoMap;
  upVoteCount?: number;
  downVoteCount?: number;
};

export const NadeTitle: FC<Props> = memo(
  ({ title, subTitle, nadeId, canEdit, nadeSlug, inModal }) => {
    const { colors } = useTheme();

    return (
      <>
        <div className="title">
          <div id="left-controls">
            {!inModal && (
              <button
                id="back"
                onClick={() => {
                  window.history.back();
                }}
              >
                <FaChevronLeft />
              </button>
            )}
          </div>

          <div id="actions">
            <TitleReportBtn nadeId={nadeId} />
            <TitleFavBtn nadeId={nadeId} />
          </div>

          <h1 className="nade-title">
            <span className="main-title">{title}</span>
            <span className="sub-title">{subTitle}</span>
          </h1>

          {canEdit && (
            <div className="edit">
              <Link
                href="/nades/[...slug]"
                as={`/nades/${nadeSlug || nadeId}/edit`}
              >
                <button className="edit-btn">
                  <FaEdit /> EDIT
                </button>
              </Link>
            </div>
          )}
        </div>

        <style jsx>{`
          .title {
            position: relative;
            display: grid;
            grid-template-columns: 50px 100px 1fr 100px 50px;
            grid-template-areas:
              "controls controls title actions actions"
              "controls controls title actions actions";
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          }

          #left-controls {
            grid-area: controls;
            align-self: center;
          }

          #actions {
            grid-area: actions;
            align-self: center;
            justify-self: end;
            display: flex;
          }

          #back {
            color: ${colors.TEXT};
            font-size: 24px;
            display: block;
            position: relative;
            top: 0px;
            background: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            margin: 0;
            padding: 0;
            display: block;
            width: 30px;
            height: 24px;
          }

          .nade-title {
            grid-area: title;
            padding-top: 15px;
          }

          .edit {
            position: absolute;
            top: 0;
            left: calc(50% - 50px);
            width: 100px;
            display: flex;
            justify-content: center;
          }

          .edit-btn {
            background: ${colors.filterBg};
            border: none;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            color: white;
            padding: 5px 10px;
            outline: none;
            font-size: 10px;
            cursor: pointer;
            white-space: nowrap;
          }

          .edit-btn:hover {
            background: ${colors.filterBgHover};
          }

          h1 {
            font-size: 26px;
            margin: 0;
            padding: 0;
            font-weight: 300;
            padding: 10px 0px;
            color: ${colors.TEXT};
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .main-title {
          }

          .sub-title {
            font-size: 15px;
            opacity: 0.75;
            margin-top: -8px;
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
  }
);
