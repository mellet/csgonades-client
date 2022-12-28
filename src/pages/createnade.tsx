import { NextPage } from "next";
import { HeaderDefault } from "../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../core/layout/LayoutBuilder";
import { NadeAddWidget } from "../nade/components/NadeAddWidget/NadeAddWidget";

const CreateNade: NextPage = () => {
  return <LayoutBuilder header={<HeaderDefault />} main={<NadeAddWidget />} />;
};

export default CreateNade;
