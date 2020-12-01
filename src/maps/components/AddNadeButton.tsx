import Link from "next/link";
import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const AddNadeButton: FC = () => {
  const isSignedIn = useIsSignedIn();
  const { colors } = useTheme();

  if (!isSignedIn) {
    return null;
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
          <div>
            <Link href="/createnade">
              <button className="add-btn">
                <FaPlus />
              </button>
            </Link>
          </div>
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
};
