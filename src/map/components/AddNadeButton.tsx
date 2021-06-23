import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import Router from "next/router";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { useTheme } from "../../core/settings/SettingsHooks";

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
      <button className="add-btn" onClick={onClick}>
        <span>Add Nade</span> <FaPlus size={14} />
      </button>

      <style jsx>{`
        .add-btn {
          border: none;
          border-radius: 10px;
          overflow: hidden;
          outline: none;
          background: rgba(140, 192, 28, 0.8);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s;
          padding: 0;
          padding-right: 10px;
        }

        .add-btn span {
          font-size: 13px;
          font-weight: 500;
          padding: 8px 6px 8px 10px;
          background: rgba(140, 192, 28, 0.5);
          margin-right: 8px;
          border-right: 1px solid #729c17;
        }

        .add-btn:hover {
          background: rgba(140, 192, 28, 1);
          cursor: pointer;
          color: white;
        }

        .add-btn:focus-visible {
          outline: 1px auto ${colors.focusOutline};
        }
      `}</style>
    </>
  );
});
