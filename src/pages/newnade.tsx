import { NextPage } from "next";
import { NewNadePage } from "../newnade/NewNadePage";
import { SEO } from "../layout/SEO";
import { LayoutBuilder } from "../layout/LayoutBuilder";
import { HeaderDefault } from "../defaultheader/Header";
import { Navigation } from "../navigation/Navigation";

const NewNadeContainer: NextPage = () => {
  return (
    <>
      <SEO canonical="/newnade" title="New nade" />
      <LayoutBuilder
        header={<HeaderDefault />}
        nav={<Navigation />}
        main={<NewNadePage />}
      />
    </>
  );
};

export default NewNadeContainer;
