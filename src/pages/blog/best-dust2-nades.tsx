import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../defaultheader/Header";
import { BestDust2NadesBlogPost } from "../../blog/blogposts/BestDust2Nades";

const BestDust2NadesBlogPostPage = (): JSX.Element => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<BestDust2NadesBlogPost />}
    />
  );
};

export default BestDust2NadesBlogPostPage;
