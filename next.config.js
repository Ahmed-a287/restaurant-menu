const isGithubPages = process.env.GITHUB_PAGES === 'true';

module.exports = {
  eslint: { ignoreDuringBuilds: true },
  output: 'export',
  basePath: isGithubPages ? '/restaurant-menu' : '',
  assetPrefix: isGithubPages ? '/restaurant-menu/' : '',
};
