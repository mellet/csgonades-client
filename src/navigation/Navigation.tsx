import { FC } from "react";
import { Footer } from "./NavFooter";
import { MapNav } from "./MapNav";
import { SecondaryNav } from "./SecondaryNav";

export const Navigation: FC = ({}) => {
  return (
    <>
      <div id="navigation">
        <div id="nav-main">
          <MapNav />
          <SecondaryNav />
        </div>
        <div id="nav-footer">
          <Footer />
        </div>
      </div>
      <style jsx>{`
        #navigation {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        #nav-main {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow-y: hidden;
        }

        #nav-main:hover {
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};
