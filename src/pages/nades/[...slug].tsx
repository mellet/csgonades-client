import { GetServerSideProps, NextPage } from "next";
import { Nade } from "../../nade/models/Nade";
import { NadeNotFound } from "../../nade/components/NadeNotFound";
import { NadeApi } from "../../nade/data/NadeApi";
import { EditNadeMain } from "../../nade/EditNadeMain";
import { LayoutBuilder } from "../../core/layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../core/layout/defaultheader/Header";

type Props = {
  nade: Nade | null;
};

const NadeEdit: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    return <NadeNotFound />;
  }

  return (
    <LayoutBuilder
      nav={<Navigation />}
      header={<HeaderDefault />}
      main={<EditNadeMain nade={nade} />}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const [nadeId, operation] = query.slug;

  if (!nadeId || !operation) {
    return {
      notFound: true,
    };
  }

  const validOperation = ["edit"];

  if (!validOperation.includes(operation)) {
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
