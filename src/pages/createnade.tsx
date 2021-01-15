import { NextPage } from "next";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { CreateNadeMain } from "../nade/CreateNadeMain";
import { Navigation } from "../navigation/Navigation";

const CreateNade: NextPage = () => {
  return (
    <LayoutBuilder
      header={<HeaderDefault />}
      nav={<Navigation />}
      main={<CreateNadeMain />}
    />
  );
};

export default CreateNade;
