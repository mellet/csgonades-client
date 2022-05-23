import { FC } from "react";
import { NadeLight } from "../nade/models/Nade";

type Props = {
  pendingNades: NadeLight[];
};

export const NadeReviewWidget: FC<Props> = ({ pendingNades }) => {
  return (
    <>
      <div>
        <h1>Nade review</h1>
        <div>
          Video
          <br />
          HUD has been removed?
          <br />
          Crosshair has proper visibility?
          <br />
          Aspect ratio is correct?
          <br />
        </div>
        <div>
          Result image
          <br />
          Everything is hidden?
        </div>
        <div>
          Line up image
          <br />
          Everything is hidden?
          <br />
          Matched video?
        </div>
        <div>
          Meta data
          <br />
          Make any adjustments if needed
          <br />
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};
