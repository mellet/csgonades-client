import { FC, MouseEventHandler, useState } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";
import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";
import { SortByBar } from "./SortByBar";
import useSortedNades from "./useSortedNades";
import { AdUnitAdSense } from "../../../shared-components/adunits/Adsense";

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

  const onDismissCloseClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();

    ga.event({
      category: "map_page",
      action: "close_suggested_nades",
    });

    onDismiss();
  };

  return (
    <>
      <div className="wrapper">
        <MapViewWrapper
          {...fadeInUp}
          animate={open ? "visible" : "hidden"}
          onClick={onDismissCloseClick}
          initial={initialOpenState ? "visible" : "hidden"}
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
                {open && (
                  <div className="a">
                    <AdUnitAdSense adFormat="fixed728x90" />
                  </div>
                )}
              </>
            )}
          </div>
        </MapViewWrapper>
      </div>
      <style jsx>{`
        .a {
          max-width: 728px;
          height: 90px;
          margin: ${Dimensions.GUTTER_SIZE / 2}px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: center;
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
          overflow: hidden;
          pointer-events: ${open ? "auto" : "none"};
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
          margin: ${Dimensions.GUTTER_SIZE / 2}px;
          flex: 1;
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
          border: 1px solid ${colors.BORDER};
        }

        .title {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "msg . close";
          padding: 8px 8px 0px 8px;
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

const MapViewWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow: hidden;
  pointer-events: none;
`;
