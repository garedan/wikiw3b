/** @type {import('next').NextConfig} */
//const removeImports = require("next-remove-imports")();

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  }, 
  env: {
    STAGING_ALCHEMY_KEY:
    "https://eth-sepolia.g.alchemy.com/v2/B54X_xFsbfi5cwsmQ-42FPPGzmIGzotb"
  },
}

module.exports = nextConfig



/* module.exports = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig
  });
}; */
