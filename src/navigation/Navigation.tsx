import { FC } from "react";
import { Footer } from "./NavFooter";
import { MapNav } from "./MapNav";
import { SecondaryNav } from "./SecondaryNav";
import { Dimensions } from "../constants/Constants";
import { Spacer } from "../shared-components/Spacer";

export const Navigation: FC = ({}) => {
  return (
    <>
      <div id="navigation">
        <Spacer vertical>
          <MapNav />
          <div>
            <SecondaryNav />
            <Footer />
          </div>
        </Spacer>
      </div>
      <style jsx>{`
        #navigation {
          position: sticky;
          top: calc(${Dimensions.HEADER_HEIGHT + Dimensions.GUTTER_SIZE}px);
        }
      `}</style>
    </>
  );
};
