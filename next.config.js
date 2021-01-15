// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const base = {
  typescript: {
    ignoreDevErrors: true,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
  productionBrowserSourceMaps: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
    adsEnabled: process.env.ADS_ENABLED
  },
};

module.exports = withBundleAnalyzer(base);
