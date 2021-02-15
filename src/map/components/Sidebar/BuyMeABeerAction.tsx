import { FC } from "react";
import { useGa } from "../../../utils/Analytics";

export const BuyMeABeerAction: FC = ({}) => {
  const ga = useGa();

  function logBma() {
    ga.event({ category: "map_page", action: "click_buy_me_a_beer" });
  }

  return (
    <>
      <a
        onClick={logBma}
        className="bma-link"
        href="https://www.buymeacoffee.com/csgonades"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <button className="bma">
          <span>
            Buy me a <span className="cta">Coffee</span>
          </span>
          <div className="img-wrapper">
            <img src="/bmc-white.svg" />
          </div>
        </button>
      </a>
      <style jsx>{`
        .bma {
          background: #f7ae05;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: none;
          outline: none;
          cursor: pointer;
          transition: background 0.15s;
          position: relative;
          overflow: hidden;
          height: 50px;
        }

        .bma:hover {
          background: #e3a005;
        }

        .bma span {
          color: white;
        }

        .bma .cta {
          font-weight: 500;
        }

        .img-wrapper {
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bma img {
          height: 30px;
        }
      `}</style>
    </>
  );
};
