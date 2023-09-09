import { FC } from "react";
import { NadeItemThumbnail } from "../../../nade/components/NadeItem/NadeItemThumbnail";
import { EloGameNadeTitle } from "./EloGameNadeTitle";
import { NadeStatsSpecials } from "../../../nade/components/NadeItem/NadeStats/NadeStatsSpecials";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../core/settings/useTheme";
import { NadeLight } from "../../../nade/models/NadePartial";

type Props = {
  nadeOne: NadeLight;
  nadeTwo: NadeLight;
  onSelectWinner: (
    nadeOneId: string,
    nadeTwoId: string,
    nadeWinnerId: string
  ) => void;
};

export const EloGameVS: FC<Props> = ({ nadeOne, nadeTwo, onSelectWinner }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="elo-game-vs">
        <div className="nade-view">
          <div
            className="left"
            onClick={() => {
              onSelectWinner(nadeOne.id, nadeTwo.id, nadeOne.id);
            }}
          >
            <EloGameNadeTitle nade={nadeOne} />
            <NadeItemThumbnail
              gameMode={nadeOne.gameMode}
              lineUpThumnUrl={nadeOne.images.lineup.medium}
              nadeId={nadeOne.id}
              nadeSlug={nadeOne.slug}
              thumbnailUrl={nadeOne.images.result.medium}
              youTubeId={nadeOne.youTubeId}
              quality="hd"
              speed="normal"
            />
            <div className="nade-specials">
              <NadeStatsSpecials
                gameMode={nadeOne.gameMode}
                movement={nadeOne.movement}
                teamSide={nadeOne.teamSide}
                technique={nadeOne.technique}
                tickrate={nadeOne.tickrate}
              />
            </div>
          </div>
          <div className="vs">VS</div>
          <div
            className="right"
            onClick={() => {
              onSelectWinner(nadeOne.id, nadeTwo.id, nadeTwo.id);
            }}
          >
            <EloGameNadeTitle nade={nadeTwo} />
            <NadeItemThumbnail
              gameMode={nadeTwo.gameMode}
              lineUpThumnUrl={nadeTwo.images.lineup.medium}
              nadeId={nadeTwo.id}
              nadeSlug={nadeTwo.slug}
              thumbnailUrl={nadeTwo.images.result.medium}
              youTubeId={nadeTwo.youTubeId}
              speed="normal"
            />
            <div className="nade-specials">
              <NadeStatsSpecials
                gameMode={nadeTwo.gameMode}
                movement={nadeTwo.movement}
                teamSide={nadeTwo.teamSide}
                technique={nadeTwo.technique}
                tickrate={nadeTwo.tickrate}
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .left,
        .right {
          flex: 1;
          opacity: 0.95;
          border: 1px solid ${colors.BORDER};
          border-radius: ${Dimensions.BORDER_RADIUS};
          overflow: hidden;
          background: ${colors.DP02};
          cursor: pointer;
        }

        .nade-specials {
          padding: 6px 12px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .vs {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          font-size: 24px;
        }

        .left:hover,
        .right:hover {
          opacity: 1;
        }

        .nade-view,
        .picker {
          display: flex;
        }
      `}</style>
    </>
  );
};
