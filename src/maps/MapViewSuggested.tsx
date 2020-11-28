import { FC } from "react";
import { NadeLight } from "../nade-data/Nade/Nade";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../common/list/CsgnList";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
  const { colors } = useTheme();

  function renderItem(item: NadeLight) {
    return <NadeItem nade={item} />;
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  if (!nades) {
    return null;
  }

  return (
    <>
      <div className="suggested-nades" onClick={onDismiss}>
        <div className="bg" />
        <div className="nades">
          <div className="title">
            <div className="label">Found multiple nades for location</div>
            <div className="close-btn" onClick={onDismiss}>
              <FaTimes />
            </div>
          </div>
          <div className="nade-list-wrap">
            <CsgnList<NadeLight>
              data={nades}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .suggested-nades {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: 800;
          background: transparent;
          overflow-y: auto;
          overflow: hidden;
          opacity: 0;
          animation-name: fadeId;
          animation-duration: 0.3s;
          animation-fill-mode: forwards;
        }

        .nades {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          overflow-y: auto;
        }

        .nade-list-wrap {
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${colors.DP00};
          opacity: 0.95;
        }

        .title {
          color: ${colors.TEXT};
          text-transform: uppercase;
          text-align: center;
          font-size: 18px;
          font-weight: 400;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "msg . close";
          background: ${colors.DP01};
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          position: sticky;
          top: 0;
          z-index: 1;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .label {
          grid-area: msg;
          white-space: nowrap;
          align-self: center;
        }

        .close-btn {
          grid-area: close;
          font-size: 32px;
          justify-self: end;
          color: #850b0b;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.15s;
        }

        .close-btn:hover {
          opacity: 1;
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
