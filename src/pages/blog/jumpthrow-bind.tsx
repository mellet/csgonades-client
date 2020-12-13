import { FC } from "react";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { JumpThrowBindBlogMain } from "../../blogposts/JumpThrowBind";
import { HeaderDefault } from "../../defaultheader/Header";
import { Navigation } from "../../navigation/Navigation";

const NadeAlignCrosshairBlogPost: FC = () => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<JumpThrowBindBlogMain></JumpThrowBindBlogMain>}
    />
  );
};

export default NadeAlignCrosshairBlogPost;
