import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io", "i.ytimg.com"],
  },
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: "false",
  },
  // react-pdf (gift voucher PDF) must run as a plain Node package, not bundled.
  serverExternalPackages: ["@react-pdf/renderer"],
  // Files read from disk when rendering the voucher PDF in the webhook: our fonts and logo, plus
  // pdfkit's standard fonts and data, which it loads dynamically so tracing misses them.
  outputFileTracingIncludes: {
    "/api/webhook/stripe": [
      "./assets/**/*",
      "../node_modules/pdfkit/js/standard-fonts/**/*",
      "../node_modules/pdfkit/js/data/**/*",
    ],
  },
};

export default nextConfig;
