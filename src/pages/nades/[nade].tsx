import { GetServerSideProps, NextPage } from "next";
import { NadeApi } from "../../nade-data/NadeApi";
import { Nade } from "../../nade-data/Nade/Nade";
import { NadeNotFound } from "../../nade-ui/NadeNotFound";
import { NadePage } from "../../nade-ui";

type Props = {
  nade: Nade;
};

const NadePageComponent: NextPage<Props> = ({ nade }) => {
  if (!nade) {
    return <NadeNotFound />;
  }

  return <NadePage key={nade.id} nade={nade} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const nadeIdOrSlug = query.nade as string;

  const idIsOnlyNumbers = /^\d+$/.test(nadeIdOrSlug);

  // Old site urls are no longer available
  if (nadeIdOrSlug.length <= 3 && idIsOnlyNumbers) {
    res.statusCode = 410;
    return {
      props: {
        nade: null,
      },
    };
  }

  const requestedSlug = checkIsSlug(nadeIdOrSlug);

  const result = await NadeApi.byId(nadeIdOrSlug);

  if (result.isErr()) {
    res.statusCode = 404;
    return {
      props: {
        nade: null,
      },
    };
  }

  // Redirect to slug url if using non slug url
  if (!requestedSlug && result.value.slug) {
    res.writeHead(301, {
      Location: `/nades/${result.value.slug}`,
    });
    res.end();
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
