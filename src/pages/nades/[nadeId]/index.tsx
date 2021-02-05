import { GetServerSideProps, NextPage } from "next";
import { LayoutBuilder } from "../../../core/layout/LayoutBuilder";
import { NadeHeader } from "../../../nade/components/NadeHeader/NadeHeader";
import { NadeNotFound } from "../../../nade/components/NadeNotFound";
import { NadeApi } from "../../../nade/data/NadeApi";
import { Nade } from "../../../nade/models/Nade";
import { NadeMain } from "../../../nade/NadeMain";

type Props = {
  nade: Nade;
};

const NadePageComponent: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    return <NadeNotFound />;
  }

  return (
    <LayoutBuilder
      header={<NadeHeader key={nade.id} nade={nade} />}
      main={<NadeMain key={nade.id} nade={nade} />}
    />
  );
};

type QueryProps = {
  nadeId: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  QueryProps
> = async ({ params }) => {
  const nadeIdOrSlug = params?.nadeId;

  if (!nadeIdOrSlug) {
    return {
      notFound: true,
    };
  }

  const idIsOnlyNumbers = /^\d+$/.test(nadeIdOrSlug);

  // Old site urls are no longer available
  if (nadeIdOrSlug.length <= 3 && idIsOnlyNumbers) {
    return {
      notFound: true,
    };
  }

  const requestedSlug = checkIsSlug(nadeIdOrSlug);

  const result = await NadeApi.byId(nadeIdOrSlug);

  if (result.isErr()) {
    // Might need to display a better error
    return {
      notFound: true,
    };
  }

  // Redirect to slug url if using non slug url
  if (!requestedSlug && result.value.slug) {
    return {
      redirect: {
        destination: `/nades/${result.value.slug}`,
        statusCode: 301,
      },
    };
  }

  return {
    props: {
      nade: result.value,
    },
  };
};

function checkIsSlug(value: string) {
  return value.includes("-");
}

export default NadePageComponent;
