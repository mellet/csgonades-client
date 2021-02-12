import { FC, memo } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { useGaEvent } from "../../../utils/Analytics";
import { Dimensions } from "../../../constants/Constants";
import { Nade } from "../../models/Nade";
import { NadeTitle } from "./NadeTitle";

type Props = {
  nade: Nade;
};

export const NadeTitleBar: FC<Props> = memo(({ nade }) => {
  const event = useGaEvent();

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
          {!!nade.map && (
            <Link href={`/maps/${nade.map}`}>
              <button id="back" onClick={logBackEvent}>
                <FaChevronLeft />
              </button>
            </Link>
          )}
        </div>

        <div className="main-title">
          <NadeTitle nade={nade} />
        </div>
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

        .main-title {
          grid-area: title;
          align-self: center;
          margin-left: -16px;
        }

        @media only screen and (max-width: 800px) {
          .main-title {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
