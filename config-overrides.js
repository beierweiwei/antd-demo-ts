const tsImportPluginFactory = require('ts-import-plugin')
const rewireLess = require('react-app-rewire-less');
const { getLoader } = require("react-app-rewired");
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd-mobile',
        style: true,
      }) ]
    })
  };
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" },
  })(config, env);
  return config;
};