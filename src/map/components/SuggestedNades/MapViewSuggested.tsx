import { FC, MouseEventHandler, useState } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";
import { motion, MotionProps } from "framer-motion";
import { SortByBar } from "./SortByBar";
import useSortedNades from "./useSortedNades";
import { AdUnit } from "../../../shared-components/adunits/AdUnit";

type Props = {
  open: boolean;
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

const fadeInUp: MotionProps = {
  variants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  initial: "hidden",
  transition: { duration: 0.25, ease: "easeInOut" },
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss, open }) => {
  const [initialOpenState] = useState(open);
  const { colors } = useTheme();
  const sortedNades = useSortedNades(nades);
  const ga = useGa();

  const stopPropagation: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  function renderItem(item: NadeLight) {
    return (
      <div onClick={stopPropagation}>
        <NadeItem nade={item} />
      </div>
    );
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  const onBackgroundClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    ga.event({
      category: "map_page",
      action: "close_suggested_nades_bg",
    });

    onDismiss();
  };

  const onDismissCloseClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    ga.event({
      category: "map_page",
      action: "close_suggested_nades_btn",
    });

    onDismiss();
  };

  return (
    <>
      <div className="wrapper">
        <motion.div
          animate={open ? "visible" : "hidden"}
          onClick={onBackgroundClick}
          initial={initialOpenState ? "visible" : "hidden"}
          className="mapview-wrapper"
          {...fadeInUp}
        >
          <div className="bg" />
          <div className="nades">
            <div className="title">
              <div onClick={stopPropagation}>
                <SortByBar />
              </div>
              <div className="close-btn" onClick={onDismissCloseClick}>
                <FaTimes />
              </div>
            </div>
            {sortedNades && (
              <>
                <div className="nade-list-wrap">
                  <CsgnList<NadeLight>
                    data={sortedNades}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    enableAds={false}
                  />
                </div>
                {false && (
                  <div className="a">
                    <AdUnit name="suggestedNadesHorizontal" />
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        .a {
          display: block;
          align-self: center;
          width: 95%;
          margin-top: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .wrapper {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 800;
          background: transparent;
          border-radius: 8px;
          pointer-events: ${open ? "auto" : "none"};
          overflow: hidden;
        }

        .mapview-wrapper {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: none;
          border-radius: 8px;
        }

        .nades {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          overflow-y: auto;
          pointer-events: ${open ? "auto" : "none"};
          display: flex;
          flex-direction: column;
        }

        .nade-list-wrap {
          padding: ${Dimensions.GUTTER_SIZE / 2}px;
          overflow-y: auto;
        }

        .bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${colors.DP03};
          opacity: 0.9;
          border-radius: 8px;
        }

        .title {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "msg . close";
          align-items: center;
          background: ${colors.DP03};
          padding: ${Dimensions.GUTTER_SIZE / 2}px;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .label {
          grid-area: msg;
          white-space: nowrap;
          align-self: center;
          font-size: 20px;
          font-weight: 400;
          color: ${colors.TEXT};
        }

        .close-btn {
          grid-area: close;
          font-size: 24px;
          justify-self: end;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
          transition: color, background 0.3s;
          background: rgba(196, 12, 12, 0.7);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: ${open ? "auto" : "none"};
          margin-right: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .close-btn:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(196, 12, 12, 1);
        }

        @keyframes fadeId {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
