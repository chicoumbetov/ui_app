const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const path = require('path')

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: { dangerouslyAddModulePathsToTranspile: ['moti', '@motify'] },
  }, argv);

  config.module.rules.forEach(r => {
    if (r.oneOf) {
      r.oneOf.forEach(o => {
        if (o.use && o.use.loader && o.use.loader.includes('babel-loader')) {
          o.include = [
            path.resolve('.'),
            path.resolve('node_modules/@ui-kitten/components'),
            path.resolve('node_modules/@ant-design/react-native'),
            path.resolve('node_modules/@ant-design/icons-react-native'),
            path.resolve('node_modules/react-native'),
          ]
        }
      })
    }
  })
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      let hasModified = false;

      const newRule = {
        ...rule,
        oneOf: rule.oneOf.map(oneOfRule => {
          if (oneOfRule.test && oneOfRule.test.toString().includes('svg')) {
            hasModified = true;
            const test = oneOfRule.test.toString().replace('|svg', '');
            return { ...oneOfRule, test: new RegExp(test) };
          } else {
            return oneOfRule;
          }
        })
      };

      // Add new rule to use svgr
      // Place at the beginning so that the default loader doesn't catch it
      if (hasModified) {
        newRule.oneOf.unshift({
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [{
                    removeViewBox: false
                  }]
                }
              }
            }
          ]
        });
      }

      return newRule;
    } else {
      return rule;
    }
  });

  if (env.mode === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        path: 'web-report',
      })
    );
  }
  config.plugin.push(
    new MomentLocalesPlugin({
      localesToKeep: ['fr'],
    }),
  )

  return config;
};
