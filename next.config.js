// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`,
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: false },
      { source: "/saison", destination: "/fr/saison", permanent: false },
      { source: "/saison/:slug", destination: "/fr-fr/saison/:slug", permanent: false },
      { source: "/l-ensemble", destination: "/fr/l-ensemble", permanent: false },
      { source: "/l-ensemble/:slug", destination: "/fr/l-ensemble/:slug", permanent: false },
      { source: "/media", destination: "/fr/media", permanent: false },
      { source: "/media/:media", destination: "/fr/media/:media", permanent: false },
      { source: "/media/:media/:slug", destination: "/fr/media/:media/:slug", permanent: false },
      { source: "/editions", destination: "/fr/editions", permanent: false },
      { source: "/billetterie", destination: "/fr/billetterie", permanent: false },
    ];
  },
}
