import { GetServerSideProps, NextPage } from "next";
import { Nade } from "../../nade-data/Nade/Nade";
import { NadeNotFound } from "../../nade-main/NadeNotFound";
import { NadeApi } from "../../nade-data/NadeApi";
import { EditNadeMain } from "../../nade-edit-main/EditNadeMain";
import { LayoutBuilder } from "../../layout/LayoutBuilder";
import { Navigation } from "../../navigation/Navigation";
import { HeaderDefault } from "../../defaultheader/Header";

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
