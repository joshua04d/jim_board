import withPWA from "next-pwa";

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
};

export default withPWA(pwaConfig)({
  reactStrictMode: true,
  turbopack: {}, // 👈 This silences the Turbopack conflict
});