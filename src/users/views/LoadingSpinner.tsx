import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import { CSGNIcon } from "../../nade/components/NadeStatus/CSGNIcon";

export const LoadingSpinner: FC = () => {
  return (
    <>
      <div className="loading-spinner">
        <CSGNIcon icon={<FaSpinner />} size={30} spin />
      </div>
      <style jsx>{`
        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
        }
      `}</style>
    </>
  );
};
