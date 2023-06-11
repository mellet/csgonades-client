import { FC, useRef, useState, useMemo } from "react";
import { FaCopy } from "react-icons/fa";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../core/settings/useTheme";

type Props = {
  value: string;
};

export const BlogCopyPaste: FC<Props> = ({ value }) => {
  const { colors } = useTheme();
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const confirmClassName = useMemo(() => {
    const base = ["copy-confirm"];
    if (displayConfirm) {
      base.push("visible");
    }
    return base.join(" ");
  }, [displayConfirm]);

  function copyToClipboard() {
    if (!ref.current) {
      return;
    }
    const node = ref.current;

    node.select();
    node.setSelectionRange(0, 99999);

    /* Copy the text inside the text field */
    document.execCommand("copy");

    setDisplayConfirm(true);
    setTimeout(() => {
      setDisplayConfirm(false);
    }, 1500);
  }

  const inputSize =
    value.length > 50 ? undefined : Math.round(value.length * 0.9);

  return (
    <>
      <div className="copy-paste">
        <div className={confirmClassName}>Copied to clipboard</div>
        <input ref={ref} defaultValue={value} size={inputSize} />
        <button onClick={copyToClipboard}>
          <FaCopy /> <span>Copy</span>
        </button>
      </div>
      <style jsx>{`
        .copy-paste {
          position: relative;
          display: inline-flex;
        }

        .copy-confirm {
          background: #79c900;
          border-radius: ${Dimensions.BORDER_RADIUS};
          bottom: 100%;
          color: white;
          margin-bottom: 10px;
          margin-left: 10px;
          opacity: 0;
          padding: 2px;
          position: absolute;
          right: 0;
          transition: opacity 0.5s;
          white-space: nowrap;
        }

        .visible {
          opacity: 1;
        }

        input {
          background: rgba(201, 101, 0, 0.2);
          border-bottom-left-radius: 5px;
          border-top-left-radius: 5px;
          border: none;
          flex: 1;
          outline: none;
          padding: 9px ${Dimensions.PADDING_MEDIUM};
          background: #d1d1d1;
          color: ${colors.TEXT};
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP01};
          font-size: 14px;
          min-width: 300px;
          height: 40px;
        }

        button {
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          border: none;
          color: white;
          cursor: pointer;
          padding: ${Dimensions.PADDING_MEDIUM};
          display: flex;
          align-items: center;
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP03_transparent};
          color: ${colors.TEXT};
          border-left: none;
          font-size: 14px;
          height: 40px;
        }

        button:hover {
          background: ${colors.DP01};
        }

        button span {
          margin-left: 4px;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};
