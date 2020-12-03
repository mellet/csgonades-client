import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { NadeApi } from "../../nade-data/NadeApi";
import { CsgoMap, getAllCsGoMaps } from "../../nade-data/Nade/CsGoMap";
import { NadeLight } from "../../nade-data/Nade/Nade";
import { MapPage } from "../../maps/MapPage";

interface Props {
  map: CsgoMap;
  ssrNades: NadeLight[];
}

const Map: NextPage<Props> = ({ map, ssrNades }) => {
  if (!ssrNades) {
    return null;
  }

  return <MapPage key={map} map={map} allNades={ssrNades} />;
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
    return { notFound: true };
  }

  const mapName = params.map;
  const mapNadesResult = await NadeApi.getByMap(mapName);

  const ssrNades = mapNadesResult.isOk() ? mapNadesResult.value : [];

  return {
    props: {
      map: mapName,
      ssrNades: ssrNades,
    },
    revalidate: 60 * 5,
  };
};

export default Map;
