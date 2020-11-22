import { FC } from "react";
import { NadeLight } from "../nade-data/Nade/Nade";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../common/list/CsgnList";
import { Dimensions } from "../constants/Constants";

type Props = {
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
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
      <style jsx>{`
        .suggested-nades {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.9);
          z-index: 800;
          animation-name: slide-down;
          animation-duration: 0.25s;
          animation-fill-mode: forwards;
          overflow-y: auto;
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

        .suggested-nades::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        .suggested-nades::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        /* Handle */
        .suggested-nades::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.6);
        }

        /* Handle on hover */
        .suggested-nades::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        .title {
          color: white;
          text-transform: uppercase;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: ". msg close";
        }

        .label {
          grid-area: msg;
        }

        .close-btn {
          grid-area: close;
          font-size: 24px;
          justify-self: end;
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
