import { FC } from "react";
import { CSGNIcon } from "../../nade/components/NadeStatus/CSGNIcon";
import { FaSpinner } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";

type Props = {
  isLoading: boolean;
};

export const MapLoadingScreen: FC<Props> = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <>
      <span className="spinner">
        <div className="spinner-content">
          <CSGNIcon spin icon={<FaSpinner size={30} />} size={30} />
        </div>
      </span>
      <style jsx>{`
        .spinner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 999;
        }

        .spinner-content {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px ${Dimensions.GUTTER_SIZE}px;
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </>
  );
};
