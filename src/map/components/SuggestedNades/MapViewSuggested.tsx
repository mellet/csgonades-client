import { FC, MouseEventHandler } from "react";
import { NadeLight } from "../../../nade/models/Nade";
import { NadeItem } from "../../../nade/components/NadeItem/NadeItem";
import { FaTimes } from "react-icons/fa";
import { CsgnList } from "../../../shared-components/list/CsgnList";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useAnalytics } from "../../../utils/Analytics";

type Props = {
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
  const { colors } = useTheme();
  const { event } = useAnalytics();

  const logNadeClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    event({
      category: "Suggested Nade",
      action: "Nade Clicked",
    });
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

    event({
      category: "Suggested Nade",
      action: "Dismiss",
    });

    onDismiss();
  };

  if (!nades) {
    return null;
  }

  return (
    <>
      <div className="suggested-nades" onClick={onDismissCloseClick}>
        <div className="bg" />
        <div className="nades">
          <div className="title">
            <div className="label">Found multiple nades</div>
            <div className="close-btn" onClick={onDismissCloseClick}>
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
          -webkit-backdrop-filter: blur(2px);
          backdrop-filter: blur(2px);
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
          opacity: 0.9;
        }

        .title {
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
          font-size: 20px;
          font-weight: 400;
          color: ${colors.TEXT};
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
