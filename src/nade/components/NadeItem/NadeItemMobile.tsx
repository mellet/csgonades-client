import { FC, useState, useEffect } from "react";
import { FaChevronRight, FaPlay, FaStop } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dimensions } from "../../../constants/Constants";
import { NadeLight } from "../../models/Nade";
import { useTheme } from "../../../core/settings/SettingsHooks";
import { NadeItemTitle } from "./NadeItemTitle";
import { NadeStats } from "./NadeStats/NadeStats";
import Link from "next/link";

interface Props {
  nade: NadeLight;
  onItemClick?: () => void;
}

export const NadeItemMobile: FC<Props> = ({ nade, onItemClick }) => {
  const [clientSide, setClientSide] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setClientSide(true);
  }, []);

  function onNadeItemClick() {
    onItemClick && onItemClick();
    setShowMenu(!showMenu);
  }

  function onPlayClick() {
    setIsPlaying(!isPlaying);
  }

  const urlIdOrSlug = nade.slug || nade.id;

  if (!clientSide) {
    return null;
  }

  return (
    <>
      <div className="nadebox-mobile" onClick={onNadeItemClick}>
        {showMenu && (
          <div className="context-menu">
            <div className="context-btns">
              <div className="context-action" onClick={onPlayClick}>
                {isPlaying && (
                  <>
                    <span>Stop</span>{" "}
                    <FaStop style={{ position: "relative", top: 2 }} />
                  </>
                )}
                {!isPlaying && (
                  <>
                    <span>Play</span>{" "}
                    <FaPlay style={{ position: "relative", top: 2 }} />
                  </>
                )}
              </div>
              <div className="context-action">
                <Link href={`/nades/${urlIdOrSlug}`}>
                  <a className="nade-page-link">
                    Details{" "}
                    <FaChevronRight style={{ position: "relative", top: 2 }} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}

        <NadeItemTitle
          endPosition={nade.endPosition}
          oneWay={nade.oneWay}
          startPosition={nade.startPosition}
          status={nade.status}
          type={nade.type}
        />

        <div className="media-canvas">
          <div className="media-content">
            <div className="media-image">
              <LazyLoadImage
                alt={`nade thumbnail`}
                effect="blur"
                src={nade.images.thumbnailUrl} // use normal <img> attributes as props
                width={"100%"}
              />
            </div>
            {isPlaying && (
              <div className="media-video">
                <video autoPlay muted playsInline loop controls={false}>
                  <source src={nade.gfycat.smallVideoUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>

        <NadeStats
          commentCount={nade.commentCount}
          createdAt={nade.createdAt}
          favoriteCount={nade.favoriteCount}
          isFavorited={nade.isFavorited}
          isPro={nade.isPro}
          movement={nade.movement}
          technique={nade.technique}
          tickrate={nade.tickrate}
          viewCount={nade.viewCount}
        />
      </div>
      <style jsx>{`
        .nadebox-mobile {
          background: ${colors.DP01};
          width: 100%;
          overflow: hidden;
          position: relative;
          border-radius: ${Dimensions.BORDER_RADIUS};
          margin-bottom: ${Dimensions.GUTTER_SIZE}px;
        }

        .media-canvas {
          background: black;
          display: block;
          overflow: hidden;
          overflow: hidden;
          padding-top: 56.25%;
          position: relative;
          width: 100%;
        }

        .context-menu {
          align-items: center;
          bottom: 0;
          display: flex;
          justify-content: space-around;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 997;
        }

        .context-btns {
          display: flex;
          padding: 12px;
        }

        .context-action {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          margin: 6px;
          padding: 12px 18px;
        }

        .media-content {
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .media-image img {
          width: 100%;
        }

        .media-video {
          bottom: 0;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .media-video video {
          width: 100%;
        }

        .nade-page-link {
          color: #222;
        }
      `}</style>
    </>
  );
};
