import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../defaultheader/Header";
import { PractiseConfigBlogPost } from "../../blogposts/PracticeConfig";

const PractiseConfigBlogPostPage = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<PractiseConfigBlogPost />}
    />
  );
};

export default PractiseConfigBlogPostPage;
