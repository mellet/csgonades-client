import { FC } from "react";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { blogTickrateAndJumpthrow } from "../../blog/ArticleData/blogPosts";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { TickrateAndJumpthrowPost } from "../../blog-pages/TickrateAndJumpthrowPost";

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
