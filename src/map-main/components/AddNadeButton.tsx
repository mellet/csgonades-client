import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import Router from "next/router";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";

export const AddNadeButton: FC = memo(() => {
  const { setSignInWarning } = useSignInWarning();
  const isSignedIn = useIsSignedIn();
  const { colors } = useTheme();

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
        content="New Nade"
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
          background: rgba(255, 255, 255, 0.9);
          color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-btn:hover {
          background: ${colors.SUCCESS};
          cursor: pointer;
          color: white;
        }
      `}</style>
    </>
  );
});
