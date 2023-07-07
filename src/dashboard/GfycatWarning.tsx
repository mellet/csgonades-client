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
            We regret to inform you that Gfycat will be permanently shutting
            down in September. To ensure that your videos are not lost, please
            follow these steps:
          </p>
          <ol>
            <li>Download your videos from Gfycat as soon as possible.</li>
            <li>Upload the downloaded videos to YouTube.</li>
            <li>
              Update the video URLs of your nades with the new YouTube links.
            </li>
          </ol>
          <p>
            In the event that you are unable to complete these actions within
            the given timeframe, we will take the initiative to perform them on
            your behalf. The videos will be uploaded to our YouTube Channel.
          </p>
          <p>
            Please act promptly to preserve your content. If you have any
            questions or need assistance, feel free to reach out to us.
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
