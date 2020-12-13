import { FC } from "react";
import { TickrateAndJumpthrowPost } from "../../blog/blogposts/TickrateAndJumpthrowPost";
import { HeaderDefault } from "../../defaultheader/Header";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const TickRateAndJumpthrowBindBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<TickrateAndJumpthrowPost />}
    />
  );
};

export default TickRateAndJumpthrowBindBlogPost;
