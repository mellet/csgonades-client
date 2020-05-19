import { FC, useState, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Popup } from "semantic-ui-react";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useVotes } from "../../store/VoteStore/hooks/useVotes";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { useAnalytics } from "../../utils/Analytics";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  nadeId: string;
  upVoteCount?: number;
  downVoteCount?: number;
};

export const NadeItemVoteControls: FC<Props> = ({
  nadeId,
  downVoteCount,
  upVoteCount,
}) => {
  const [score, setScore] = useState(setInitialScore(upVoteCount, downVoteCount));
  const { colors } = useTheme();
  const [voteValue, setVoteValue] = useState(0);
  const { event } = useAnalytics();
  const { castVote, clearVote, votes } = useVotes();
  const isSignedIn = useIsSignedIn();
  const { setSignInWarning } = useSignInWarning();

  useEffect(() => {
    const currentVote = votes.find((v) => v.nadeId === nadeId);
    if (currentVote) {
      setVoteValue(currentVote.vote);
    }
  }, [votes, nadeId]);

  const isUpvoted = voteValue === 1;
  const isDownvoted = voteValue === -1;

  function onUpVote(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (!isSignedIn) {
      return setSignInWarning("vote");
    }

    if (isUpvoted) {
      setVoteValue(0);
      setScore(score - 1);
      clearVote(nadeId);
      event({
        category: "Vote",
        action: "Clear",
        label: nadeId,
      });
    } else {
      setScore(score + 1);
      setVoteValue(1);
      castVote(nadeId, 1);
      event({
        category: "Vote",
        action: "Up",
        label: nadeId,
      });
    }
  }

  function onDownVote(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (!isSignedIn) {
      return setSignInWarning("vote");
    }

    if (isDownvoted) {
      setVoteValue(0);
      setScore(score + 1);
      clearVote(nadeId);
      event({
        category: "Vote",
        action: "Clear",
        label: nadeId,
      });
    } else {
      setVoteValue(-1);
      castVote(nadeId, -1);
      setScore(score - 1);
      event({
        category: "Vote",
        action: "Down",
        label: nadeId,
      });
    }
  }

  return (
    <>
      <div className="vote-controls">
        <Popup
          content="Up Vote"
          size="mini"
          position="left center"
          mouseEnterDelay={200}
          inverted
          trigger={
            <button onClick={onUpVote} className="btn up">
              <FaChevronUp className="icon-fix-yo space-bottom" />
            </button>
          }
        />

        <span className="score">{score}</span>

        <Popup
          content="Down Vote"
          size="mini"
          position="left center"
          mouseEnterDelay={200}
          inverted
          trigger={
            <button onClick={onDownVote} className="btn down">
              <FaChevronDown className="icon-fix-yo space-top" />
            </button>
          }
        />
      </div>
      <style jsx global>{`
        .icon-fix-yo {
          font-size: 16px;
          margin: 0;
          padding: 0;
          line-height: 16px;
        }

        .space-bottom {
          position: relative;
        }

        .space-top {
          position: relative;
          top: 2px;
        }
      `}</style>

      <style jsx>{`
        .vote-controls {
          display: flex;
          flex-direction: column;
        }

        .btn {
          outline: none;
          background: rgba(0, 0, 0, 0.5);
          width: 36px;
          height: 26px;
          cursor: pointer;

          border: none;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .score {
          background: rgba(0, 0, 0, 0.5);
          color: white;
          width: 36px;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          border-top: 1px solid rgba(0, 0, 0, 0.8);
          border-bottom: 1px solid rgba(0, 0, 0, 0.8);
        }

        .up {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          color: ${isUpvoted ? colors.SUCCESS : "white"};
        }

        .down {
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          color: ${isDownvoted ? colors.ERROR : "white"};
        }

        .up:hover {
          background: rgba(0, 0, 0, 0.8);
          color: ${colors.SUCCESS};
        }

        .down:hover {
          background: rgba(0, 0, 0, 0.8);
          color: ${colors.ERROR};
        }
      `}</style>
    </>
  );
};

function setInitialScore(upvotes?: number, downvotes?: number) {
  const ups = upvotes || 0;
  const downs = downvotes || 0;
  const voteCount = ups + downs;
  const score = ups - downs;

  if (score < 0 && voteCount < 5) {
    return 0;
  }

  return score;
}