// config.js
const config = {
  metadata: {
    ogType: 'website',
    ogUrl: 'https://notaa.dev',
    ogTitle: 'Not Another Adventurer (Adult Novel)!',
    ogDescription: 'Play Online!',
    ogImage: 'web_preview.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Play Online!',
    twitterDescription: 'Explore our interactive greeting and play online!',
    twitterImage: 'web_preview.png',
  },
  galleryImages: [
    'gallery/01.webp',
    'gallery/02.webp',
    'gallery/03.webp',
    'gallery/04.webp',
  ],
  socialLinks: [
    {
      name: 'Patreon',
      url: 'https://www.patreon.com/NotAnotherAdventurer',
      icon: 'icons/patreon.webp',
      visible: true,
    },
    {
      name: 'Itch.io',
      url: 'https://notanotherdev.itch.io/not-another-adventurer',
      icon: 'icons/itch.webp',
      visible: true,
    },
    {
      name: 'X (formerly Twitter)',
      url: 'https://x.com/notanotherdev',
      icon: 'icons/x.webp',
      visible: true,
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/qTJyPWJFFg',
      icon: 'icons/discord.webp',
      visible: true,
    },
  ],
  downloads: [
    {
      os: 'Windows',
      visible: true,
      url: 'https://downloads.notaa.dev/NotAA-Pre-Release-Demo-pc.zip',
      checksum: 'ed2e0c8e3ee98d05126f2d2610b34d95',
    },
    {
      os: 'Mac',
      visible: true,
      url: 'https://downloads.notaa.dev/NotAA-Pre-Release-Demo-mac.zip',
      checksum: 'ba54576f5a406d703eee6ca25e5f827b',
    },
    {
      os: 'Linux',
      visible: true,
      url: 'https://downloads.notaa.dev/notaa.dev.program-release.apk',
      checksum: 'ed2e0c8e3ee98d05126f2d2610b34d95',
    },
    {
      os: 'Android',
      visible: true,
      url: 'https://downloads.notaa.dev/notaa.dev.program-release.apk',
      checksum: '8a544d088413285df87eb0c4ec51275d',
    },
  ],

};