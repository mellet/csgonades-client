import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import { CSGNIcon } from "../../nade/components/NadeStatus/CSGNIcon";

export const LoadingSpinner: FC = () => {
  return (
    <>
      <div>
        <CSGNIcon icon={<FaSpinner />} size={30} spin />
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
        }
      `}</style>
    </>
  );
};
