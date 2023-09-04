import { FC, memo } from "react";
import { FaPlus } from "react-icons/fa";
import { useIsSignedIn } from "../../core/authentication/useIsSignedIn";
import Router from "next/router";
import { useSignInWarning } from "../../core/global/hooks/useSignInWarning";
import { SquareButton } from "../../shared-components/buttons/IconButton/SquareButton";

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
      <div className="add-nade-button">
        <SquareButton icon={<FaPlus />} onClick={onClick} activeColor="green" />
      </div>

      <style jsx>{`
        .add-nade-button {
          position: absolute;
          top: 15px;
          right: 15px;
        }
      `}</style>
    </>
  );
});
