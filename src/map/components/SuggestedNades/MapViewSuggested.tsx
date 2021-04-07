import { FC, MouseEventHandler } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";
import { motion, MotionProps } from "framer-motion";
import styled from "styled-components";

type Props = {
  open: boolean;
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

const fadeInUp: MotionProps = {
  variants: {
    hidden: { opacity: 0, translateY: "-100%" },
    visible: { opacity: 1, translateY: 0 },
  },
  initial: "hidden",
  transition: { duration: 0.3, ease: "easeOut" },
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss, open }) => {
  const { colors } = useTheme();
  const ga = useGa();

  const logNadeClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  function renderItem(item: NadeLight) {
    return (
      <div onClick={logNadeClick}>
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
        >
          <div className="bg" />
          <div className="nades">
            <div className="title">
              <div className="close-btn" onClick={onDismissCloseClick}>
                <FaTimes />
              </div>
            </div>
            {nades && (
              <div className="nade-list-wrap">
                <CsgnList<NadeLight>
                  data={nades}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
              </div>
            )}
          </div>
        </MapViewWrapper>
      </div>
      <style jsx>{`
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
          pointer-events: none;
        }

        .nades {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          overflow-y: auto;
          pointer-events: auto;
        }

        .nade-list-wrap {
          margin: ${Dimensions.GUTTER_SIZE / 2}px;
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
          color: rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: color, background 0.3s;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .close-btn:hover {
          color: rgba(255, 255, 255, 1);
          background: rgba(196, 12, 12, 0.75);
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
  pointer-events: auto;
`;
