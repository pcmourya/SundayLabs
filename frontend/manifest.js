const manifestForPlugIn = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'download192.png', 'vite.svg'],
  manifest: {
    name: 'SundayLabs',
    short_name: 'SundayLabs',
    description: 'I am a simple vite app',
    icons: [
      {
        src: '/download192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/download512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/vite.svg',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};
