/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: true,
  exportTrailingSlash: true,
  images: {
    domains: ["localhost"],
  }, 
  env: {
    STAGING_ALCHEMY_KEY:
    "https://eth-goerli.g.alchemy.com/v2/SShG9FTsR3tnsu_XL0RTCK2OM3LPavog"
  },
}

module.exports = nextConfig



module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig
  });
}; 
