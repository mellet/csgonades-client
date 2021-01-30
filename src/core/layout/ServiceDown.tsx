import { FC, memo } from "react";
import { CSGNModal } from "../../shared-components/CSGNModal";
import { useApiStatus } from "../global/hooks/useApiStatus";

export const ServiceDown: FC = memo(({}) => {
  const { apiStatus } = useApiStatus();

  function reload() {
    location.reload();
  }

  return (
    <CSGNModal
      visible={apiStatus === "offline"}
      empty={true}
      onDismiss={reload}
    >
      <div className="service-down">
        <h3>Service Down</h3>
        <p>
          We seem to have some technical difficulties.
          <br /> Refresh the page or come back later.
          <br />
          <br />
          <button className="refresh-btn" onClick={reload}>
            Refresh page
          </button>
        </p>
      </div>
      <style jsx>{`
        .service-down {
          background: maroon;
          max-width: 450px;
          border-radius: 5px;
          padding: 30px;
          margin: 0 auto;
          text-align: center;
          color: white;
        }

        .refresh-btn {
          border: none;
          outline: none;
          padding: 15px 30px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.7);
          cursor: pointer;
        }

        .refresh-btn:hover {
          background: rgba(255, 255, 255, 1);
        }
      `}</style>
    </CSGNModal>
  );
});
