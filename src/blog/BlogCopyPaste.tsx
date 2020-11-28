import { FC, useRef, useState, useMemo } from "react";

type Props = {
  value: string;
};

export const BlogCopyPaste: FC<Props> = ({ value }) => {
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

  return (
    <>
      <div className="copy-paste">
        <div className={confirmClassName}>Copied to clipboard</div>
        <input ref={ref} defaultValue={value} />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <style jsx>{`
        .copy-paste {
          display: flex;
          margin-bottom: 20px;
          margin-top: 20px;
          position: relative;
        }

        .copy-confirm {
          background: #79c900;
          border-radius: 5px;
          bottom: 100%;
          color: white;
          margin-bottom: 10px;
          margin-left: 10px;
          opacity: 0;
          padding: 5px;
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
          padding: 15px;
        }

        button {
          background: rgba(201, 101, 0, 0.9);
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          border: none;
          color: white;
          cursor: pointer;
          padding: 15px;
        }
      `}</style>
    </>
  );
};
