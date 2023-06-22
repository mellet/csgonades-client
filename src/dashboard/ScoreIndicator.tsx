import { FC, useMemo } from "react";
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
  createdAt,
  score,
}) => {
  const isNew = isNewNade(createdAt);
  const lowScore = favoriteCount < 10 && score < 1350;
  const isGood = score >= 1400 && favoriteCount > 20;
  const isVeryGood = score >= 1450 && favoriteCount > 50;

  const iconSelector = useMemo(() => {
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

    if (isVeryGood) {
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

    if (isGood) {
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

    if (lowScore) {
      return (
        <Popup
          position="right center"
          content="This nade is probably not very useful."
          inverted
          size="tiny"
          trigger={<FaSadCry color="#f20000" />}
        />
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
  }, [isGood, isNew, isVeryGood, lowScore]);

  return (
    <>
      <div>{iconSelector}</div>
      <style jsx>{``}</style>
    </>
  );
};
