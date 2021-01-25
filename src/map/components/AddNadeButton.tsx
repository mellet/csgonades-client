import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import Router from "next/router";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";

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
      <Popup
        content="Add Nade"
        position="left center"
        inverted
        size="tiny"
        hoverable
        trigger={
          <button className="add-btn" onClick={onClick}>
            <FaPlus />
          </button>
        }
      />

      <style jsx>{`
        .add-btn {
          border: none;
          border-radius: 50%;
          outline: none;
          width: 36px;
          height: 36px;
          background: rgba(140, 192, 28, 0.8);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s;
        }

        .add-btn:hover {
          background: rgba(140, 192, 28, 1);
          cursor: pointer;
          color: white;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
});
