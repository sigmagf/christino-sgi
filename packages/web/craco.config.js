// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');

module.exports = {
  webpack: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
};
