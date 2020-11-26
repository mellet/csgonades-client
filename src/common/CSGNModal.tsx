import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import { LayerPosition } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  title?: string;
  visible: boolean;
  onDismiss: () => void;
  empty?: boolean;
};

export const CSGNModal: FC<Props> = ({
  children,
  title,
  visible,
  onDismiss,
  empty,
}) => {
  const { colors } = useTheme();

  if (!visible) {
    return null;
  }

  if (empty) {
    return (
      <>
        <div className="modal-bg" onClick={onDismiss}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
        <style jsx>{`
          .modal-bg {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: ${LayerPosition.MODAL};
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
          }

          .modal {
            align-self: center;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="modal-bg" onClick={onDismiss}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {!!title && (
            <div className="modal-title">
              <div className="spacer" />
              <h3>{title}</h3>
              <div className="spacer">
                <button className="close-btn" onClick={onDismiss}>
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
          <div className="modal-content">{children}</div>
        </div>
      </div>
      <style jsx>{`
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: ${LayerPosition.MODAL};
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
        }

        .modal {
          align-self: center;
          border-radius: 6px;
          max-width: 90vw;
          max-height: 90vh;
          background: ${colors.DP01};
          color: ${colors.TEXT};
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .modal-title {
          background: ${colors.PRIMARY};
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          white-space: nowrap;
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .spacer {
          width: 20%;
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }

        .modal-title h3 {
          margin: 0;
          padding: 0;
          font-size: 20px;
          flex: 1;
          text-align: center;
        }

        .close-btn {
          border: none;
          outline: none;
          appearance: none;
          font-size: 30px;
          cursor: pointer;
          padding-top: 7px;
          background: transparent;
          color: white;
          margin-right: 10px;
        }

        .close-btn:hover {
          color: ${colors.ERROR};
        }

        .modal-content {
          overflow-y: auto;
          flex: 1;
        }
      `}</style>
    </>
  );
};
