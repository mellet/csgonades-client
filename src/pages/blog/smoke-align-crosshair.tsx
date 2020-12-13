import { FC } from "react";
import { NadeAlignCrosshairPost } from "../../blogposts/NadeAlignCrosshairPost";
import { HeaderDefault } from "../../defaultheader/Header";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<NadeAlignCrosshairPost />}
    />
  );
};

export default NadeAlignCrosshairBlogPost;
