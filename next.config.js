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
};

module.exports = withBundleAnalyzer(base);
