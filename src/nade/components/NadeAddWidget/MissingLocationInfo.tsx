import { FC, useState } from "react";
import { FaTimes } from "react-icons/fa";

export const MissingLocationInfo: FC = ({}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="missing-pos-info">
        <div className="missing-pos-info-header">
          <span>Missing location?</span>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <p>Select the closest location and we will add yours on the map.</p>
      </div>
      <style jsx>{`
        .missing-pos-info {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 2;
          width: 200px;
          border-radius: 5px;
          background: #ed5f00;
          overflow: hidden;
        }

        .missing-pos-info-header {
          background: #d65600;
          display: flex;
          justify-content: space-between;
          color: white;
          font-size: 14px;
          padding: 6px 10px;
          align-items: center;
          font-weight: 400;
        }

        p {
          padding: 10px;
          color: white;
          font-size: 12px;
        }

        .close-btn {
          all: unset;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          background: white;
          color: #d65600;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          cursor: pointer;
        }

        .close-btn:hover {
          background: #ff9999;
          color: red;
        }
      `}</style>
    </>
  );
};
