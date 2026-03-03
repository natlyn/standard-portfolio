// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nathline Caristil — Technical Writer',
  tagline: 'API docs, user guides, and SaaS documentation',
  favicon: 'img/favicon.ico',

  url: 'https://natlyn.github.io',
  baseUrl: '/standard-portfolio/',

  organizationName: 'natlyn',
  projectName: 'standard-portfolio',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve docs at the root — intro.md becomes the homepage
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false, // No blog needed for a portfolio
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nathline Caristil',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'portfolioSidebar',
            position: 'left',
            label: 'Portfolio',
          },
          {
            href: 'mailto:nathlinecaristil@gmail.com',
            label: 'Contact',
            position: 'right',
          },
          {
            href: 'https://github.com/natlyn',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Nathline Caristil. Technical Writer.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'javascript', 'python'],
      },
    }),
};

module.exports = config;