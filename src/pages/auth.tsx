import { NextPage } from "next";
import { useOnSignIn } from "../store/AuthStore/AuthHooks";
import { SEO } from "../layout/SEO";
import { useEffect, useState } from "react";

const Auth: NextPage = () => {
  const [isSlow, setIsSlow] = useState(false);
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsSlow(true);
    }, 5000);
    return () => clearTimeout(delay);
  }, []);
  useOnSignIn();

  return (
    <>
      <SEO title="Signing in" canonical="/auth" />
      <div className="loading">
        <div className="loading-msg">
          <p className="sign-in-msg">Loading</p>
          <p>Please wait...</p>
          {isSlow && (
            <p>
              This seems to be taking a while... You can try refreshing the
              page.
            </p>
          )}
        </div>
      </div>
      <style jsx>{`
        .sign-in-msg {
          font-weight: 400;
          font-size: 30px;
        }

        .loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          background: rgba(0, 0, 0, 0.95);
        }

        .loading-msg {
          text-align: center;
          color: white;
          font-size: 24px;
        }
      `}</style>
    </>
  );
};

export default Auth;
