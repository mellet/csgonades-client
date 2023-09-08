import { FC, useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";
import { SiBrave } from "react-icons/si";
import { useGa } from "../../utils/Analytics";

export const BraveBrowserWarning: FC = () => {
  const [isBrave, setIsBrave] = useState(false);
  const [isClosed, setIsClosed] = useLocalStorage("brave-warning", false);
  const { event } = useGa();

  useEffect(() => {
    if (
      // @ts-ignore
      window.navigator.brave != undefined &&
      // @ts-ignore
      window.navigator.brave.isBrave.name == "isBrave"
    ) {
      setIsBrave(true);
    }
  }, []);

  function onClose() {
    event({
      action: "brave_warning_closed",
      category: "map_page",
    });
    setIsClosed(true);
  }

  if (!isBrave || isClosed) {
    return null;
  }

  return (
    <>
      <div className="brave-warning">
        <div className="brave-warning-content">
          <div className="brave-warning-header">
            <span className="brave-icon">
              <SiBrave size={18} />
            </span>
            <h3>Brave Browser Issue</h3>
            <button onClick={onClose}>
              <FaTimesCircle size={18} />
            </button>
          </div>

          <p>
            Unfortunately, map interactions may not function correctly with{" "}
            <b>Brave Shield</b> enabled. For the best experience, please disable
            it on this site. If you&apos;ve already done so, you can disregard
            this message.
          </p>
          <p>
            <a href="#" onClick={onClose}>
              I disabled Brave Shield, thanks!
            </a>
          </p>
        </div>
      </div>
      <style jsx>{`
        .brave-warning {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brave-warning-content {
          border-radius: 5px;
          max-width: 350px;
          margin: 0 auto;
          border: 2px solid #ff2000;
          background: white;
          padding: 15px;
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        }

        .brave-warning-header {
          border-bottom: 1px solid #ff2000;
          margin-bottom: 6px;
          padding-bottom: 6px;
          display: flex;
          justify-content: space-between;
        }

        h3 {
          font-size: 18px;
          padding: 0;
          margin: 0;
        }

        .brave-icon {
          color: #ff2000;
          margin-right: 6px;
        }

        p {
          font-size: 14px;
        }

        button {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          color: #bbb;
        }

        button:hover {
          color: red;
        }

        a {
          color: #ff2000;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
