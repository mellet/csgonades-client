import { useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { EzoicPlaceholder } from "./EzoicPlaceholder";

export function FixedBottomClosabeleAd(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!window.ezstandalone) {
      setIsOpen(false);
    } else {
      timer = setTimeout(() => setIsOpen(true), 3000);
    }
    return () => clearTimeout(timer);
  }, []);

  const classNameBuilder = useMemo(() => {
    const base = ["ad-bottom-sticky"];
    if (isOpen) {
      base.push("open");
    }
    return base.join(" ");
  }, [isOpen]);

  return (
    <>
      <div className={classNameBuilder}>
        <div id="ad-wrapper">
          <span className="ad-label">Advert</span>
          <div className="ad-content">
            <EzoicPlaceholder disableAdLabel={true} id="193" />
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
      </div>
      <style jsx>{`
        #ad-wrapper {
          display: flex;
        }

        .ad-bottom-sticky {
          bottom: 0;
          display: flex;
          height: 90px;
          justify-content: center;
          left: 0;
          position: fixed;
          right: 0;
          transform: translateY(100%);
          transition: transform 0.3s;
          z-index: 1000;
        }

        .open {
          transform: translateY(0px);
        }

        #ad-title {
          background: white;
          display: flex;
          justify-content: space-between;
          width: 750px;
        }

        .ad-label {
          background: rgba(255, 255, 255, 1);
          border-top-left-radius: 5px;
          color: rgba(0, 0, 0, 0.7);
          font-weight: bold;
          padding: 3px;
          text-align: center;
          text-orientation: mixed;
          writing-mode: vertical-rl;
        }

        .ad-content {
          background: rgba(255, 255, 255, 0.8);
          width: 750px;
        }

        .close-btn {
          background: rgba(255, 255, 255, 1);
          border-top-right-radius: 5px;
          border: none;
          color: rgba(199, 28, 16, 0.7);
          cursor: pointer;
          outline: none;
        }

        .close-btn:hover {
          color: rgba(199, 28, 16, 1);
        }
      `}</style>
    </>
  );
}
