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
      <div className="suggested-nades">
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
          padding: ${Dimensions.GUTTER_SIZE}px;
          overflow: hidden;
        }

        .nades {
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          padding: 16px;
          overflow-y: auto;
        }

        .nade-list-wrap {
        }

        .bg {
          position: absolute;
          top: -10%;
          left: -10%;
          right: -10%;
          bottom: -10%;
          background: white;
          opacity: 0.75;
          backdrop-filter: blur(4px);
        }

        .title {
          color: ${colors.TEXT};
          text-transform: uppercase;
          text-align: center;
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 16px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: ". msg close";
          height: 40px;
        }

        .label {
          grid-area: msg;
        }

        .close-btn {
          grid-area: close;
          font-size: 40px;
          justify-self: end;
          color: #850b0b;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.15s;
        }

        .close-btn:hover {
          opacity: 1;
        }

        @keyframes slide-down {
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
