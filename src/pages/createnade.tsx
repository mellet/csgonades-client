import { NextPage } from "next";
import { HeaderDefault } from "../defaultheader/Header";
import { LayoutBuilder } from "../layout/LayoutBuilder";
import { CreateNadeMain } from "../nade-create-main/CreateNadeMain";
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
