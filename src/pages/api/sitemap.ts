import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const config = getConfig()?.publicRuntimeConfig;

const CsGoMaps = {
  dust2: "Dust2",
  mirage: "Mirage",
  nuke: "Nuke",
  inferno: "Inferno",
  cache: "Cache",
  overpass: "Overpass",
  vertigo: "Vertigo",
  train: "Train",
  cobblestone: "Cobblestone",
  anubis: "Anubis",
};

function mapsList() {
  const maps: string[] = [];
  for (const key in CsGoMaps) {
    maps.push(key);
  }
  return maps;
}

const SITE_ROOT = "https://www.csgonades.com";
const API_SOURCE = config.apiUrl;

const createSitemap = async () => {
  let xml = "";
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  xml += "<url>";
  xml += `<loc>${SITE_ROOT}</loc>`;
  xml += `<changefreq>always</changefreq>`;
  xml += `<priority>0.5</priority>`;
  xml += "</url>";

  const staticPages = [
    "about",
    "contact",
    "privacypolicy",
    "blog",
    "blog/tickrate-and-jumpthrow-bind",
    "blog/practice-config",
    "blog/smoke-align-crosshair",
    "blog/best-dust2-nades",
    "blog/jumpthrow-bind",
  ];

  staticPages.forEach((staticPage) => {
    const page = `${SITE_ROOT}/${staticPage}`;

    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<changefreq>monthly</changefreq>`;
    xml += `<priority>0.5</priority>`;
    xml += "</url>";
  });

  const maps = mapsList();

  maps.forEach((map) => {
    const page = `${SITE_ROOT}/maps/${map}`;
    xml += "<url>";
    xml += `<loc>${page}</loc>`;
    xml += `<changefreq>always</changefreq>`;
    xml += `<priority>0.5</priority>`;
    xml += "</url>";
  });

  try {
    const result = await axios.get(`${API_SOURCE}/nades?limit=all`);
    const nades = result.data;

    for (const nade of nades) {
      const idOrSlug = nade.slug || nade.id;
      xml += "<url><loc>";
      xml += `${SITE_ROOT}/nades/${idOrSlug}`;
      xml +=
        "</loc><changefreq>always</changefreq><priority>0.5</priority></url>";
    }
  } catch (error) {
    console.error(error);
  }

  xml += "</urlset>";

  return xml;
};

const siteMap = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/xml");

  const sitemap = await createSitemap();

  res.send(sitemap);
};

export default siteMap;
