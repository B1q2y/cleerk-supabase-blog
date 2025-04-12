import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    // resolve または alias が未定義の可能性があるため明示的に初期化
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

export default nextConfig;
