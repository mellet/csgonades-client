import { FC, memo } from "react";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import { Dimensions } from "../../../constants/Constants";
import { Nade } from "../../models/Nade";
import { NadeTitle } from "./NadeTitle";

type Props = {
  nade: Nade;
};

export const NadeTitleBar: FC<Props> = memo(({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="title">
        <div id="left-controls">
          {!!nade.map && (
            <Link
              href={`/maps/${nade.map}?type=${nade.type}`}
              passHref
              scroll={false}
            >
              <button id="back">
                <FaChevronLeft style={{ position: "relative", left: "-2px" }} />
              </button>
            </Link>
          )}
        </div>

        <div className="main-title">
          <NadeTitle
            csGoMap={nade.map}
            isOneWay={nade.oneWay}
            nadeEndPosition={nade.endPosition}
            nadeStartPosition={nade.startPosition}
            nadeType={nade.type}
          />
        </div>
      </div>

      <style jsx>{`
        .title {
          position: relative;
          display: grid;
          grid-template-columns: min-content auto;
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
          color: ${colors.link};
          font-size: 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          margin: 0;
          padding: 0;
          display: block;
          margin-right: ${Dimensions.GUTTER_SIZE / 2}px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          transition: color 0.15s;
        }

        #back:hover {
          color: ${colors.linkHover};
        }

        #back:focus-visible {
          outline: none;
          box-shadow: 0 0 0 1px ${colors.PRIMARY};
        }

        .main-title {
          grid-area: title;
          align-self: center;
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
