import { FC } from "react";
import { User } from "../users/models/User";
import { HintBox } from "../nade/components/NadeAddWidget/HintBox";
import { Dimensions } from "../constants/Constants";

type Props = {
  user: User;
};

export const GfycatWarning: FC<Props> = ({ user }) => {
  if (!user.numNades) {
    return null;
  }

  return (
    <>
      <div className="gfycat-warning">
        <HintBox title="Important Announcement: Gfycat Shutdown Notice">
          <p>
            We are sorry to announce that Gfycat has permanently shut down in
            September. Prior to the shutdown, we were able to upload the most
            popular nades to YouTube.
          </p>
          <p>
            However, numerous GIFs were deleted, leading to the removal of their
            corresponding content.
          </p>
        </HintBox>
      </div>

      <style jsx>{`
        .gfycat-warning {
          margin-bottom: ${2 * Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
