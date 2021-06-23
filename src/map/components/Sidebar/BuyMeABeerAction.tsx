import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { useGa } from "../../../utils/Analytics";

export const BuyMeABeerAction: FC = ({}) => {
  const { colors } = useTheme();
  const ga = useGa();

  function logBma() {
    ga.event({ category: "map_page", action: "click_buy_me_a_beer" });
  }

  return (
    <>
      <a
        onClick={logBma}
        className="bma"
        href="https://www.buymeacoffee.com/csgonades"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <span>
          Buy me a <span className="cta">Coffee</span>
        </span>
        <div className="img-wrapper">
          <img src="/bmc-white.svg" />
        </div>
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
          border-bottom-left-radius: ${Dimensions.BORDER_RADIUS};
          border-bottom-right-radius: ${Dimensions.BORDER_RADIUS};
        }

        .bma:hover {
          background: #e3a005;
        }

        .bma:focus-visible {
          outline: 1px auto ${colors.focusOutline};
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
          animation: hint 1s 5s;
        }

        .bma img {
          height: 30px;
        }

        @keyframes hint {
          0% {
            transform: translateX(0) scale(1);
          }

          50% {
            transform: translateX(-20%) scale(1.25);
          }
          100% {
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};
