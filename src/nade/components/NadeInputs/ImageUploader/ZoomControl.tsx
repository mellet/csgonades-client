import { FC } from "react";
import { useTheme } from "../../../../core/settings/useTheme";

type Props = {
  currentZoom: number;
  onZoomChange: (zoom: number) => void;
};

export const ZoomControl: FC<Props> = ({ onZoomChange, currentZoom }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="zoom-control">
        <input
          onChange={(zoom) => {
            onZoomChange(Number(zoom.target.value));
          }}
          type="range"
          min="1"
          max="3"
          step={0.1}
          value={currentZoom}
          className="slider"
          id="myRange"
        />
        <span>ZOOM</span>
      </div>
      <style jsx>{`
        .zoom-control {
          position: relative;
        }

        span {
          position: absolute;
          top: 80%;
          left: 37%;
          font-weight: 500;
          font-size: 12px;
          color: white;
          opacity: 0;
        }

        .slider:hover + span {
          opacity: 0.2;
        }

        /* The slider itself */
        .slider {
          -webkit-appearance: none; /* Override default CSS styles */
          appearance: none;
          height: 6px; /* Specified height */
          background: ${colors.DP03}; /* Grey background */
          outline: none; /* Remove outline */
          opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
          -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
          transition: opacity 0.2s;
          border-radius: 3px;
        }

        /* Mouse-over effects */
        .slider:hover {
          opacity: 1; /* Fully shown on mouse-over */
        }

        /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none; /* Override default look */
          appearance: none;
          width: 16px; /* Set a specific slider handle width */
          height: 16px; /* Slider handle height */
          border-radius: 50%;
          background: ${colors.filterBgHover}; /* Green background */
          cursor: pointer; /* Cursor on hover */
          border: 1px solid ${colors.PRIMARY};
        }

        .slider::-moz-range-thumb {
          width: 16px; /* Set a specific slider handle width */
          height: 16px; /* Slider handle height */
          border-radius: 50%;

          background: ${colors.filterBgHover}; /* Green background */
          border: 1px solid ${colors.BORDER};
          cursor: pointer; /* Cursor on hover */
        }
      `}</style>
    </>
  );
};
