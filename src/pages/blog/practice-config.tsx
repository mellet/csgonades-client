import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../defaultheader/Header";
import { PractiseConfigBlogPost } from "../../blog/blogposts/PracticeConfig";
import { BlogDefaultSidebar } from "../../blog/BlogDefaultSidebar";
import { blogPractiseConfig } from "../../blog/ArticleData/blogPosts";

const PractiseConfigBlogPostPage = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<PractiseConfigBlogPost />}
      sidebar={<BlogDefaultSidebar data={blogPractiseConfig} />}
    />
  );
};

export default PractiseConfigBlogPostPage;
