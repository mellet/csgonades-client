import { FC } from "react";
import {
  RedditShareButton,
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton,
} from "react-share";
import { useAnalytics } from "../utils/Analytics";
import { FaVk, FaTwitter, FaRedditAlien, FaFacebookF } from "react-icons/fa";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Dimensions } from "../constants/Constants";

type Props = {
  visisble: boolean;
  url: string;
  title: string;
  image?: string;
  vertical?: boolean;
};

export const NadeShareActions: FC<Props> = ({
  visisble,
  url,
  title,
  image,
}) => {
  const { colors } = useTheme();
  const { event } = useAnalytics();
  const shareUrl = `https://www.csgonades.com${url}`;

  function onSosialShare(socialNetwork: string) {
    event({
      category: "SocialShare",
      action: socialNetwork,
      label: url,
    });
  }

  if (!visisble) {
    return null;
  }

  return (
    <>
      <div className="share-container">
        <div className="label">Share</div>
        <div className="share-buttons">
          <div className="share-wrap" onClick={() => onSosialShare("Reddit")}>
            <RedditShareButton url={shareUrl} title={title}>
              <div className="share-icon">
                <FaRedditAlien />
              </div>
            </RedditShareButton>
          </div>
          <div className="share-wrap" onClick={() => onSosialShare("Facebook")}>
            <FacebookShareButton url={shareUrl} quote={title}>
              <div className="share-icon">
                <FaFacebookF />
              </div>
            </FacebookShareButton>
          </div>
          <div className="share-wrap" onClick={() => onSosialShare("Twitter")}>
            <TwitterShareButton url={shareUrl} title={title}>
              <div className="share-icon">
                <FaTwitter />
              </div>
            </TwitterShareButton>
          </div>
          <div className="share-wrap" onClick={() => onSosialShare("VK")}>
            <VKShareButton url={shareUrl} title={title} image={image}>
              <div className="share-icon vk">
                <FaVk />
              </div>
            </VKShareButton>
          </div>
        </div>
      </div>
      <style jsx>{`
        .share-container {
          background ${colors.DP02};
          overflow: hidden;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .label {
          background: ${colors.DP01};
          border-bottom: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          padding: 10px 20px;
          text-align: center;
          font-size: 16px;
        }

        .share-buttons {
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          padding: 10px 20px;
        }

        .vertical {
          flex-direction: column;
        }

        .share-icon {
          width: 40px;
          height: 40px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #fff;
          background: #454545;
          transition: background 0.2s;
          border-radius: 5px;
        }

        .share-icon:hover {
          background: #111;
        }
      `}</style>
    </>
  );
};
