import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { NadeApi } from "../../api/NadeApi";
import { CsgoMap, getAllCsGoMaps } from "../../models/Nade/CsGoMap";
import { NadeLight } from "../../models/Nade/Nade";
import { MapPage2 } from "../../maps/MapPage2";

interface Props {
  map: CsgoMap;
  ssrNades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, ssrNades }) => {
  if (!ssrNades) {
    return null;
  }

  return <MapPage2 key={map} map={map} allNades={ssrNades} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const maps = getAllCsGoMaps();

  const paths = maps.map((m) => ({
    params: {
      map: m,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<any, { map: CsgoMap }> = async ({
  params,
}) => {
  if (!params) {
    return { props: { map: null, ssrNades: null } };
  }

  const mapName = params.map;
  const mapNadesResult = await NadeApi.getByMap(mapName);

  const ssrNades = mapNadesResult.isOk() ? mapNadesResult.value : [];

  return {
    props: {
      map: mapName,
      ssrNades: ssrNades,
      // Beta
      unstable_revalidate: 10,
    },
  };
};

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const map = context.query.map as CsgoMap;

  const results = await NadeApi.getByMap(map);

  if (results.isOk()) {
    return {
      props: {
        map,
        ssrNades: results.value,
      },
    };
  } else {
    return {
      props: {
        map,
        ssrNades: [],
      },
    };
  }
};
*/
export default Map;
