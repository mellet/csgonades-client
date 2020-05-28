import { FC } from "react";

export const AffUnit: FC = ({}) => {
  return (
    <>
      <div className="aff-unit">
        <a href="https://www.tkqlhce.com/click-8411959-14050302" target="_top">
          <img
            src="https://www.tqlkg.com/image-8411959-14050302"
            width="300"
            height="250"
            alt="Promote & earn money"
          />
        </a>
      </div>
      <style jsx>{`
        .aff-unit {
          display: flex;
          justify-content: space-around;
          height: 250px;
          background: rgba(255, 255, 255, 0.15) url("/noph.svg");
          background-repeat: no-repeat;
          background-position: 50% 50%;
          background-size: 18px;
        }
      `}</style>
    </>
  );
};
