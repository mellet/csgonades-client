import { NextPage } from "next";

const AdTesting: NextPage = () => {
  return (
    <>
      <div className="ads">
        <h1>Video</h1>
        <span id="ezoic-pub-video-placeholder-1"></span>
        <h1>Adtesting</h1>
        <p>Ids: 170,172,173</p>
        <div className="med-rec"></div>
        <div className="med-rec"></div>
        <div className="skyskraper"></div>
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
