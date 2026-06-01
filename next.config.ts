import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root explicitly so Next doesn't walk up the tree and
  // pick a stray lockfile in the user's home dir.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
