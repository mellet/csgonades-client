import { FC, useState, useEffect } from "react";
import { FaChevronRight, FaPlay, FaStop } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
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
                <Link href={"/nades/[nade]"} as={`/nades/${urlIdOrSlug}`}>
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
          title={nade.title}
          status={nade.status}
          type={nade.type}
          endPosition={nade.endPosition}
          oneWay={nade.oneWay}
          startPosition={nade.startPosition}
        />

        <div className="media-canvas">
          <div className="media-content">
            <div className="media-image">
              <LazyLoadImage
                effect="blur"
                alt={`nade thumbnail`}
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
          viewCount={nade.viewCount}
          isFavorited={nade.isFavorited}
          movement={nade.movement}
          technique={nade.technique}
          tickrate={nade.tickrate}
          isPro={nade.isPro}
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
          position: relative;
          width: 100%;
          overflow: hidden;
          display: block;
          padding-top: 56.25%;
          background: black;
          overflow: hidden;
        }

        .context-menu {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 997;
        }

        .context-btns {
          padding: 12px;
          display: flex;
        }

        .context-action {
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.8);
          padding: 12px 18px;
          margin: 6px;
        }

        .media-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .media-image img {
          width: 100%;
        }

        .media-video {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
