import { GetServerSideProps, NextPage } from "next";
import { Nade } from "../../nade/models/Nade";
import { NadeNotFound } from "../../nade/components/NadeNotFound";
import { NadeApi } from "../../nade/data/NadeApi";
import { EditNadeMain } from "../../nade/EditNadeMain";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../layout/defaultheader/Header";

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

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const [nadeId, operation] = query.slug;

  if (!nadeId || !operation) {
    res.statusCode = 404;
    return {
      props: {
        nade: null,
      },
    };
  }

  const validOperation = ["edit"];

  if (!validOperation.includes(operation)) {
    res.statusCode = 404;
    return {
      props: {
        nade: null,
      },
    };
  }

  const nadeResult = await NadeApi.byId(nadeId);

  if (nadeResult.isErr()) {
    res.statusCode = 404;
    return {
      props: {
        nade: null,
      },
    };
  }

  return {
    props: {
      nade: nadeResult.value,
    },
  };
};

export default NadeEdit;
