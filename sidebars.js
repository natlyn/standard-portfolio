/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  portfolioSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '👋 Home',
    },
    {
      type: 'doc',
      id: 'about',
      label: '🙋 About & Services',
    },
    {
      type: 'category',
      label: '📁 Portfolio',
      collapsible: true,
      items: [
        {
          type: 'category',
          label: 'API & Developer Docs',
          items: [
            'portfolio/api-reference',
            'portfolio/getting-started',
          ],
        },
        {
          type: 'category',
          label: 'User Guides',
          items: [
            'portfolio/user-guide',
            'portfolio/spoonacular-guide',
          ],
        },
        {
          type: 'category',
          label: 'AI Documentation',
          items: [
            'portfolio/ai-reference',
            'portfolio/prompt-library',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
