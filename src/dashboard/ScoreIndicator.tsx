import { FC, useMemo } from "react";
import { dateDaysAgo } from "../utils/DateUtils";
import {
  FaFireAlt,
  FaRetweet,
  FaSadCry,
  FaSmile,
  FaSmileBeam,
} from "react-icons/fa";
import { isNewNade } from "../utils/Common";
import { Popup } from "semantic-ui-react";

type Props = {
  score: number;
  favoriteCount: number;
  viewCount: number;
  createdAt: Date | string;
};

export const ScoreIndicator: FC<Props> = ({
  favoriteCount,
  viewCount,
  createdAt,
  score,
}) => {
  const isLowEngagement = useIsLowEngagementNade(
    favoriteCount,
    viewCount,
    createdAt
  );
  const isNew = isNewNade(createdAt);

  const iconSelector = useMemo(() => {
    if (isLowEngagement) {
      return (
        <Popup
          position="right center"
          content="This nade is probably not very useful. Considerder deleting it."
          inverted
          size="tiny"
          trigger={<FaSadCry color="#f20000" />}
        />
      );
    }

    if (isNew) {
      return (
        <Popup
          position="right center"
          content="This nade is new. Wait at least a week before the score is available."
          inverted
          size="tiny"
          trigger={<FaRetweet color="#b5b5b5" />}
        />
      );
    }

    if (score >= 100) {
      return (
        <>
          <Popup
            position="right center"
            content="Very popular nade! A big hit!"
            inverted
            size="tiny"
            trigger={<FaFireAlt color="#fc6603" />}
          />
        </>
      );
    }

    if (score > 50) {
      return (
        <>
          <Popup
            position="right center"
            content="This nade is very good! Many people find it useful"
            inverted
            size="tiny"
            trigger={<FaSmileBeam color="#46a800" />}
          />
        </>
      );
    }

    return (
      <>
        <Popup
          position="right center"
          content="This nade is good!"
          inverted
          size="tiny"
          trigger={<FaSmile color="#a88c00" />}
        />
      </>
    );
  }, [isLowEngagement, isNew, score]);

  return (
    <>
      <div>{iconSelector}</div>
      <style jsx>{``}</style>
    </>
  );
};

export function useIsLowEngagementNade(
  favoriteCount: number,
  viewCount: number,
  created: Date | string
) {
  const isLowEngagementNade = useMemo(() => {
    const isOldEnough = dateDaysAgo(created) > 60;

    if (!isOldEnough || favoriteCount > 5) {
      return false;
    }

    const popFactor = viewCount / 1000 / favoriteCount;

    return popFactor > 1.5;
  }, [favoriteCount, viewCount, created]);

  return isLowEngagementNade;
}
