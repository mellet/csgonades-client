import { NextPage } from "next";
import { EzoicPlaceholder } from "../shared-components/adunits/EzoicPlaceholder";

const AdTesting: NextPage = () => {
  return (
    <>
      <div className="ads">
        <h1>Adtesting</h1>
        <p>Ids: 170,172,173</p>
        <div className="med-rec">
          <EzoicPlaceholder id="172" />
        </div>
        <div className="med-rec">
          <EzoicPlaceholder id="173" />
        </div>
        <div className="skyskraper">
          <EzoicPlaceholder id="170" />
        </div>
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
        }

        .skyskraper {
          background: pink;
          width: 120px;
          height: 600px;
        }

        .med-rec {
          background: pink;
          width: 300px;
          height: 300px;
        }
      `}</style>
    </>
  );
};

export default AdTesting;
