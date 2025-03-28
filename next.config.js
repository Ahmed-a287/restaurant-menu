const isGithubPages = process.env.GITHUB_PAGES === 'true';

module.exports = {
  eslint: { ignoreDuringBuilds: true },
  output: 'export', // Required for static export
  basePath: isGithubPages ? '/restaurant-menu' : '', // Replace with your repo name
  assetPrefix: isGithubPages ? '/restaurant-menu/' : '', // Same as above
};
