import { FC, memo, useMemo } from "react";

type Props = {
  backgroundColor: string;
  icon: any;
  loading?: boolean;
  onClick?: () => void;
  small?: boolean;
  value: string;
};

export const ButtonWithIcon: FC<Props> = memo(
  ({ icon, onClick, value, backgroundColor, loading, small }) => {
    const classNameBuild = useMemo(() => {
      const base = ["btn"];
      if (small) {
        base.push("small");
      }
      return base.join(" ");
    }, [small]);

    return (
      <>
        <button className={classNameBuild} onClick={onClick}>
          {loading && <span className="loading">Loading...</span>}
          {!loading && (
            <>
              <span className="btn-icon">
                <span className="btn-icon-fa">{icon}</span>
              </span>
              <span className="btn-label">{value}</span>
            </>
          )}
        </button>
        <style jsx>{`
          .btn {
            align-items: center;
            appearance: none;
            background: ${backgroundColor};
            border-radius: 5px;
            border: none;
            cursor: pointer;
            display: flex;
            margin: 0;
            outline: none;
            overflow: hidden;
            padding: 0;
            transition: background 0.15s;
            width: 100%;
          }

          .btn:hover {
            background: ${LightenDarkenColor(backgroundColor, -10)};
          }

          .btn:hover .btn-icon {
            background: ${LightenDarkenColor(backgroundColor, -20)};
          }

          .loading {
            align-items: center;
            color: white;
            display: flex;
            height: 40px;
            justify-content: space-around;
            text-align: center;
            width: 100%;
          }

          .btn-icon {
            align-items: center;
            background: ${LightenDarkenColor(backgroundColor, -10)};
            border-right: 1px solid ${LightenDarkenColor(backgroundColor, -20)};
            color: white;
            display: flex;
            font-size: 16px;
            height: 40px;
            justify-content: space-around;
            transition: background 0.15s;
            width: 40px;
          }

          .btn-icon-fa {
            position: relative;
            top: 2px;
          }

          .btn-label {
            color: white;
            display: block;
            flex: 1;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            width: 100%;
          }

          .small .btn-label {
            font-size: 14px;
            padding-left: 15px;
            padding-right: 15px;
          }

          .small .btn-icon {
            font-size: 14px;
            height: 35px;
            width: 35px;
          }

          .small .btn-icon-fa {
            left: 1px;
            position: relative;
            top: 1px;
          }
        `}</style>
      </>
    );
  }
);

function LightenDarkenColor(col: string, amt: number) {
  let usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
