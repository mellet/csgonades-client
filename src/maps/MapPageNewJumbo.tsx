import { FC } from "react";
import { EzoicPlaceholder } from "../common/adunits/EzoicPlaceholder";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";
import { MapPageJumbo } from "./MapPageJumbo";

type Props = {
  csMap: CsgoMap;
  nades: NadeLight[];
};

export const MapPageNewJumbo: FC<Props> = ({ csMap, nades }) => {
  return (
    <>
      <PageCentralize>
        <div id="jumbo">
          <div id="welcome">
            <MapPageJumbo map={csMap} nades={nades} />
          </div>
          <div className="placeholder">
            <EzoicPlaceholder id="193" />
          </div>
        </div>
      </PageCentralize>
      <style jsx>{`
        #jumbo {
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          display: flex;
          justify-content: space-between;
        }

        #welcome {
          padding-right: ${Dimensions.GUTTER_SIZE}px;
        }

        .placeholder {
          height: 90px;
          max-width: 728px;
          overflow: auto;
        }

        @media only screen and (max-width: 1100px) {
          #jumbo {
            flex-direction: column;
            align-items: flex-start;
          }

          #welcome {
            padding-bottom: ${Dimensions.GUTTER_SIZE}px;
            padding-right: 0;
          }
        }
      `}</style>
    </>
  );
};
