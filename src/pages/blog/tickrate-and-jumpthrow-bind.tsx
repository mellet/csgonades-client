import { FC } from "react";
import { TickrateAndJumpthrowPost } from "../../blog/blogposts/TickrateAndJumpthrowPost";
import { HeaderDefault } from "../../layout/defaultheader/Header";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { blogTickrateAndJumpthrow } from "../../blog/ArticleData/blogPosts";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";

const TickRateAndJumpthrowBindBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<TickrateAndJumpthrowPost />}
      sidebar={<BlogDefaultSidebar data={blogTickrateAndJumpthrow} />}
    />
  );
};

export default TickRateAndJumpthrowBindBlogPost;
