import { FC, useEffect, useState } from "react";
import { FaCrosshairs } from "react-icons/fa";
import { useTheme } from "styled-components";
import { SquareButton } from "../../../shared-components/buttons/IconButton";
import copy from "copy-to-clipboard";
import { useGa } from "../../../utils/Analytics";
import { PositionCopyHint } from "../../../hints/components/PositionCopyHint";

type Props = {
  nadeId: string;
  setPos: string;
};

export const NadeCopyPosition: FC<Props> = ({ setPos, nadeId }) => {
  const { event } = useGa();
  const [showSuccess, setSuccess] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (!showSuccess) {
      return;
    }
    const delay = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    return () => {
      if (delay) clearTimeout(delay);
    };
  }, [showSuccess]);

  function copyToClipBoard() {
    copy(setPos);
    setSuccess(true);
    event({
      category: "nade_page",
      action: "click_copy_position",
      label: nadeId,
    });
  }

  return (
    <>
      <PositionCopyHint>
        <div className="nade-copy-position">
          {showSuccess && <div className="success">Copied to clipboard!</div>}
          <SquareButton
            icon={<FaCrosshairs />}
            onClick={copyToClipBoard}
            active={false}
            activeColor={colors.PRIMARY}
          />
        </div>
      </PositionCopyHint>

      <style jsx>{`
        .nade-copy-position {
          position: relative;
          display: inline-block;
        }

        .success {
          padding: 4px 8px;
          border-radius: 5px;
          text-align: center;
          white-space: nowrap;
          background: ${colors.SUCCESS};
          color: white;
          position: absolute;
          bottom: 100%;
          width: 150px;
          right: -55px;
          margin-bottom: 4px;
          opacity: 0;
          font-size: 14px;
          animation: anim-fadeId 3s forwards;
        }

        @keyframes anim-fadeId {
          0% {
            opacity: 0;
            transform: translateY(20%);
          }
          20% {
            opacity: 1;
            transform: translateY(0);
          }
          80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(20%);
          }
        }
      `}</style>
    </>
  );
};
