import { FC, useState, useEffect, memo, useRef } from "react";
import { NadeApi } from "../api/NadeApi";
import { Nade } from "../models/Nade/Nade";
import { useNadeModal } from "../store/MapStore/hooks/useNadeModal";
import { FaTimes } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeModalPage } from "./NadeModalPage";
import { useAnalytics } from "../utils/Analytics";
import { EzoicPlaceholder } from "../common/adunits/EzoicPlaceholder";

export const NadeModal: FC = memo(() => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { pageView } = useAnalytics();
  const { colors } = useTheme();
  const { nadeForModal, clearNadeForModal } = useNadeModal();
  const [prevPath, setPrevPath] = useState<string | undefined>();
  const [nade, setNade] = useState<Nade | null>(null);

  useEffect(() => {
    if (nadeForModal) {
      const curPath = window.location.pathname;
      setPrevPath(curPath);
      const nadePath = `/nades/${nadeForModal.slug || nadeForModal.id}`;
      window.history.pushState("", "", nadePath);
      (async () => {
        const result = await NadeApi.byId(nadeForModal.id);
        if (result.isOk()) {
          setNade(result.value);
        }
      })();
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    } else {
      setNade(null);
    }
  }, [nadeForModal]);

  // Restore path url when user dismisses
  function onDismiss() {
    clearNadeForModal();
    if (prevPath) {
      window.history.pushState("", "", prevPath);
      pageView({ path: prevPath });
    }
  }

  return (
    <>
      <div
        ref={modalRef}
        className={!!nadeForModal ? "nade-modal visible" : "nade-modal"}
        onClick={onDismiss}
      >
        <div id="nade-modal-content">
          <div id="close-wrap">
            <div id="nade-modal-close">
              <FaTimes />
            </div>
          </div>
          <div id="ph">
            <div className="ph-stick">
              <EzoicPlaceholder id="170" />
            </div>
          </div>

          <div id="center">
            {!!nadeForModal && (
              <div id="nade-page-content" onClick={(e) => e.stopPropagation()}>
                <NadeModalPage nadeLight={nadeForModal} nade={nade} />
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .ph-stick {
          position: sticky;
          top: 0;
        }

        .nade-modal {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 998;
          background: rgba(0, 0, 0, 0.8);
          overflow-y: auto;
          padding: ${Dimensions.GUTTER_SIZE}px;
          padding-top: ${Dimensions.GUTTER_SIZE * 1.5}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE * 1.5}px;
          display: none;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .visible {
          display: block;
          opacity: 1;
        }

        #nade-modal-content {
          display: grid;
          grid-template-columns: 160px 1fr 160px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-template-areas:
            "ph md close"
            "ph md close";
        }

        #center {
          grid-area: md;
        }

        #ph {
          grid-area: ph;
        }

        #close-wrap {
          grid-area: close;
          justify-self: end;
        }

        #nade-modal-close {
          position: sticky;
          top: 0;
          font-size: 30px;
          color: rgba(255, 255, 255, 0.75);
          cursor: pointer;
        }

        #nade-modal-close:hover {
          color: rgba(255, 255, 255, 1);
        }

        #nade-page-content {
          background: ${colors.DP00};
          border-radius: 5px;
          min-height: calc(100vh - ${Dimensions.GUTTER_SIZE * 1.5}px);
          max-width: ${Dimensions.PAGE_WIDTH}px;
          margin: 0 auto;
        }

        .nade-modal::-webkit-scrollbar {
          width: 10px;
        }

        /* Track */
        .nade-modal::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        .nade-modal/* Handle */
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.4);
        }

        /* Handle on hover */
        .nade-modal::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        @media only screen and (max-width: 1200px) {
          #nade-modal-content {
            grid-template-columns: 60px 1fr 60px;
            grid-template-areas:
              "ph md close"
              "ph md close";
          }

          #ph {
            display: none;
          }
        }
      `}</style>
      <style jsx global>{`
        body {
          overflow: ${nadeForModal ? "hidden" : "auto"};
        }
      `}</style>
    </>
  );
});
