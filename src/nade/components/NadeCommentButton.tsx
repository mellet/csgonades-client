import { FC } from "react";
import { FaComment } from "react-icons/fa";
import { SquareButton } from "../../shared-components/buttons/IconButton";
import { Tooltip } from "../../shared-components/Tooltip/Tooltip";
import { useGa } from "../../utils/Analytics";

type Props = {
  slug: string;
  commentCount: number;
};

export const NadeCommentButton: FC<Props> = ({ commentCount, slug }) => {
  const ga = useGa();

  function onCommentClick() {
    ga.event({
      category: "nade_page",
      action: "click_comment_button",
      label: slug,
    });
  }

  return (
    <div className="nade-comments">
      <Tooltip message="Comments" direction="right">
        <a href="#comments" onClick={onCommentClick}>
          <SquareButton
            icon={<FaComment />}
            active={false}
            labelCount={commentCount}
            activeColor={"teal"}
          />
        </a>
      </Tooltip>
    </div>
  );
};
