export default [
  {
    ignores: ['**/*.test.js', 'src/app/test/**'], // Ignores all test files
  },
  {
    rules: {
      'react/display-name': 'off', // Disables display-name warnings
      '@next/next/no-img-element': 'off', // Allows <img> tags in tests
      'jsx-a11y/alt-text': 'off', // Disables alt-text checks
    },
  },
];
