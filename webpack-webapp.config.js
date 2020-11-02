const CopyPlugin = require('copy-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');

/**
 * Extend the default Webpack configuration from nx / ng.
 */
module.exports = (config, context) => {
  const outputPath = context.outputPath;

  // Install additional plugins
  config.plugins = config.plugins || [];
  config.plugins.push(...extractRelevantNodeModules(outputPath));

  return config;
};

/**
 * This repository only contains one single package.json file that lists the dependencies
 * of all its frontend and backend applications. When a frontend application is built,
 * its external dependencies (aka Node modules) are bundled in the resulting artifact.
 * However, it is not the case for a backend application (for various valid reasons).
 * Installing all the production dependencies would dramatically increase the size of the
 * artifact. Instead, we need to extract the dependencies which are actually used by the
 * backend application. We have implemented this behavior by complementing the default
 * Webpack configuration with additional plugins.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {Array} An array of Webpack plugins
 */
function extractRelevantNodeModules(outputPath) {
  return [generatePackageJson(), copyDockerfile()];
}

function copyDockerfile(outputPath) {
  const sourceDocker = path.join(process.cwd(), 'webapp.Dockerfile');
  const destinationDocker = path.join(process.cwd(), 'dist/apps/webapp/Dockerfile');
  return new CopyPlugin({
    patterns: [
      {
        from: sourceDocker,
        to: destinationDocker,
        toType: 'file',
      },
    ],
  });
}

function generatePackageJson() {
  const basePackageJson = {
    name: 'webapp',
    version: '0.0.1',
    scripts: {
      start: 'node dist/apps/webapp/server/main.js',
    },
  };
  const pathToPackageJson = path.join(__dirname, 'package.json');
  return new GeneratePackageJsonPlugin(basePackageJson, pathToPackageJson);
}
