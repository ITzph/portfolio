const CopyPlugin = require('copy-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');

/**
 * Extend the default Webpack configuration from nx / ng.
 */
module.exports = (config, context) => {
  // Extract output path from context
  const {
    options: { outputPath },
  } = context;

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
  return [generatePackageJson(), copyPackageLockFile(outputPath), copyDockerfile(outputPath)];
}

/**
 * Copy the Yarn lock file to the bundle to make sure that the right dependencies are
 * installed when running `yarn install`.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {*} A Webpack plugin
 */
function copyYarnLockFile(outputPath) {
  return new CopyPlugin({
    patterns: [
      {
        from: 'yarn.lock',
        to: path.join(outputPath, 'yarn.lock'),
      },
    ],
  });
}

function copyDockerfile(outputPath) {
  return new CopyPlugin({
    patterns: [
      {
        from: 'api.Dockerfile',
        to: path.join(outputPath, 'Dockerfile'),
        toType: 'file',
      },
    ],
  });
}

/**
 * Copy the NPM package lock file to the bundle to make sure that the right dependencies are
 * installed when running `npm install`.
 *
 * @param {String} outputPath The path to the bundle being built
 * @returns {*} A Webpack plugin
 */
function copyPackageLockFile(outputPath) {
  return new CopyPlugin({
    patterns: [
      {
        from: 'package-lock.json',
        to: path.join(outputPath, 'package-lock.json'),
      },
    ],
  });
}

/**
 * Generate a package.json file that contains only the dependencies which are actually
 * used in the code.
 *
 * @returns {*} A Webpack plugin
 */
function generatePackageJson() {
  const implicitDeps = [
    'class-transformer',
    'class-validator',
    '@nestjs/platform-express',
    'reflect-metadata',
    'rxjs',
    'mysql',
    'passport',
    'uuid',
  ];
  const dependencies = implicitDeps.reduce((acc, dep) => {
    acc[dep] = packageJson.dependencies[dep];
    return acc;
  }, {});

  const basePackageJson = {
    name: 'nestjs-app',
    dependencies,
    version: '0.0.1',
    scripts: {
      start: 'node main.js',
    },
  };

  const pathToPackageJson = path.join(__dirname, 'package.json');
  return new GeneratePackageJsonPlugin(basePackageJson, pathToPackageJson);
}
