import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { GoogleAnalytics } from "../../../utils/GoogleAnalytics";

type Props = {
  map: CsgoMap;
};

export const NadeFilterResetButton: FC<Props> = ({ map }) => {
  const { reset, canReset } = useNadeFilter(map);

  function onReset() {
    GoogleAnalytics.event("Nade filter", `Reset`);
    reset();
  }

  const className = canReset ? "reset" : "reset disabled";

  return (
    <>
      <div className="reset-padder"></div>
      <div className={className} onClick={onReset}>
        <span>RESET</span>
        <Icon name="undo" />
      </div>
      <style jsx>{`
        .reset-padder {
          flex: 1;
        }

        .reset {
          padding: 12px;
          background: #db2828;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          cursor: pointer;
          color: white;
          transition: all 0.2s;
        }

        .disabled {
          color: black;
          background: #e0e1e2;
          opacity: 0.45;
          cursor: not-allowed;
        }

        .reset span {
          margin-right: 6px;
        }
      `}</style>
    </>
  );
};
