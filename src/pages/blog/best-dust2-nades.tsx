import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";
import { BestDust2NadesBlogPost } from "../../blog/blogposts/BestDust2Nades";
import { BlogDefaultSidebar } from "../../blog/components/BlogDefaultSidebar";
import { bestDust2Nades } from "../../blog/ArticleData/blogPosts";

const BestDust2NadesBlogPostPage = (): JSX.Element => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<BestDust2NadesBlogPost />}
      sidebar={<BlogDefaultSidebar data={bestDust2Nades} />}
    />
  );
};

export default BestDust2NadesBlogPostPage;
