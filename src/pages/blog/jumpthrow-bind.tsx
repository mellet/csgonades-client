import { FC } from "react";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { Navigation } from "../../navigation/Navigation";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { blogJumpthrowBind } from "../../blog/ArticleData/blogPosts";
import { JumpThrowBindBlogMain } from "../../blog-pages/JumpThrowBind";

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<JumpThrowBindBlogMain />}
      sidebar={<BlogDefaultSidebar data={blogJumpthrowBind} />}
    />
  );
};

export default NadeAlignCrosshairBlogPost;
