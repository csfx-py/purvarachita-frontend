const {
  useBabelRc,
  override,
  removeModuleScopePlugin,
} = require("customize-cra");
const webpack = require("webpack");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  (config) => {
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });
    // reslove path-browserify and extensions
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        path: "path-browserify",
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    };
    // add webpack.ProvidePlugin
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      })
    );
    config.plugins.push(new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
  }));
    // circular dependency plugin
    config.plugins.push(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
        cwd: process.cwd(),
        onStart({ compilation }) {
          console.log("start detecting webpack modules cycles");
        },
        onDetected({ module: webpackModuleRecord, paths, compilation }) {
          compilation.errors.push(new Error(paths.join(" -> ")));
        },
        onEnd({ compilation }) {
          console.log("end detecting webpack modules cycles");
        },
      })
    );
    return config;

    // (config) => {
    //   const fallback = config.resolve.fallback || {};
    //   Object.assign(fallback, {
    //     path: require.resolve("path-browserify"),
    //   });
    //   config.resolve.fallback = fallback;
    //   config.resolve.extensions = [".jsx", ".js", ".tsx", ".ts"];
    //   config.resolve.alias = {
    //     ...config.resolve.alias,
    //     path: "path-browserify",
    //     process: "process/browser",
    //   };
    //   config.plugins = (config.plugins || []).concat([
    //     new webpack.ProvidePlugin({
    //       process: "process/browser",
    //       Buffer: ["buffer", "Buffer"],
    //     }),
    //   ]);
    //   config.module.rules.push({
    //     test: /\.m?js/,
    //     resolve: {
    //       fullySpecified: false,
    //     },
    //   });
    // return config;
  },
  removeModuleScopePlugin()
);
