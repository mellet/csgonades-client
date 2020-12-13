import { FC } from "react";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { JumpThrowBindBlogMain } from "../../blog/blogposts/JumpThrowBind";
import { HeaderDefault } from "../../defaultheader/Header";
import { Navigation } from "../../navigation/Navigation";
import { BlogDefaultSidebar } from "../../blog/BlogDefaultSidebar";
import { blogJumpthrowBind } from "../../blog/ArticleData/blogPosts";

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<JumpThrowBindBlogMain></JumpThrowBindBlogMain>}
      sidebar={<BlogDefaultSidebar data={blogJumpthrowBind} />}
    />
  );
};

export default NadeAlignCrosshairBlogPost;
