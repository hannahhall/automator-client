/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['bulma.io', 'res.cloudinary.com'],
  },
  optimizeFonts: false,
};
