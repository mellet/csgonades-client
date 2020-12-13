import { FC, memo } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { FaChevronLeft } from "react-icons/fa";
import { CsgoMap } from "../nade-data/Nade/CsGoMap";
import Link from "next/link";
import { useAnalytics } from "../utils/Analytics";
import { Dimensions } from "../constants/Constants";

type Props = {
  map?: CsgoMap;
  subTitle?: string;
  title: string;
};

export const NadeTitle: FC<Props> = memo(({ title, subTitle, map }) => {
  const { event } = useAnalytics();

  function logBackEvent() {
    event({
      category: "Nade Page",
      action: "Back click",
    });
  }

  const { colors } = useTheme();

  return (
    <>
      <div className="title">
        <div id="left-controls">
          {!!map && (
            <Link href={`/maps/${map}`}>
              <button id="back" onClick={logBackEvent}>
                <FaChevronLeft />
              </button>
            </Link>
          )}
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
            "controls title"
            "controls title";
          width: 100%;
          height: 100%;
        }

        #left-controls {
          grid-area: controls;
          align-self: center;
        }

        #back {
          color: ${colors.TEXT};
          font-size: 28px;
          display: block;
          position: relative;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          margin: 0;
          padding: 0;
          display: block;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
          height: 100%;
          display: flex;
          align-items: center;
          left: -5px;
        }

        .nade-title {
          grid-area: title;
          align-self: center;
          margin-left: -16px;
        }

        h1 {
          font-size: 26px;
          margin: 0;
          padding: 0;
          font-weight: 300;
          color: ${colors.TEXT};
          white-space: nowrap;
        }

        @media only screen and (max-width: 800px) {
          h1 {
            font-size: 20px;
          }
        }

        @media only screen and (max-width: 600px) {
          h1 {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
});
