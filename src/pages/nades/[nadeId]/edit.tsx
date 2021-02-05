import { GetServerSideProps, NextPage } from "next";
import { HeaderDefault } from "../../../core/layout/defaultheader/Header";
import { LayoutBuilder } from "../../../core/layout/LayoutBuilder";
import { NadeApi } from "../../../nade/data/NadeApi";
import { EditNadeMain } from "../../../nade/EditNadeMain";
import { Nade } from "../../../nade/models/Nade";
import { Navigation } from "../../../navigation/Navigation";

type Props = {
  nade: Nade;
};

const NadeEdit: NextPage<Props> = ({ nade }) => {
  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<EditNadeMain nade={nade} />}
    />
  );
};

type Params = {
  nadeId: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const nadeId = params?.nadeId;

  if (!nadeId) {
    return {
      notFound: true,
    };
  }

  const nadeResult = await NadeApi.byId(nadeId);

  if (nadeResult.isErr()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      nade: nadeResult.value,
    },
  };
};

export default NadeEdit;
