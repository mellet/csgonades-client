import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import Router from "next/router";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { Dimensions } from "../../constants/Constants";

export const AddNadeButton: FC = memo(() => {
  const { setSignInWarning } = useSignInWarning();
  const isSignedIn = useIsSignedIn();

  function onClick() {
    if (isSignedIn) {
      Router.push("/createnade");
    } else {
      setSignInWarning("addnade");
    }
  }

  return (
    <>
      <button className="add-btn" onClick={onClick}>
        <span>Add Nade</span> <FaPlus size={14} />
      </button>

      <style jsx>{`
        .add-btn {
          border: none;
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          outline: none;
          background: rgba(255, 255, 255, 0.75);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.1s;
          padding: 0;
          padding-right: 10px;
        }

        .add-btn span {
          font-size: 13px;
          font-weight: 500;
          padding: 8px 6px 8px 10px;
          margin-right: 8px;
          border-right: 1px solid rgba(0, 0, 0, 0.25);
        }

        .add-btn:hover {
          cursor: pointer;
          background: white;
        }
      `}</style>
    </>
  );
});
