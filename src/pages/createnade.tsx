import { NextPage } from "next";
import { HeaderDefault } from "../layout/defaultheader/Header";
import { LayoutBuilder } from "../layout/LayoutBuilder";
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
