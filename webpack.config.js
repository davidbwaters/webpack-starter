//
//  Webpack Config
//

const path = require('path')
const merge = require('webpack-merge')

const partials = require('@davidbwaters/webpack-partials')

const rootDir = require('app-root-dir').get()
const common = merge.smart(
  {
    context: path.resolve(rootDir, 'main'),
    entry: {
      main: './scripts/main.js'
    },
    output: {
      path: path.resolve(rootDir, 'build'),
      filename: '[name][hash].js',
      publicPath: ''
    }
  },
  partials.loaderJsBabel(),
  partials.loaderFontsFile(),
  partials.loaderSvgFile(),
  partials.loaderVideoFile(),
  partials.pluginHtml({
    template: './index.html'
  }),
  partials.pluginBundleAnalyzer()
)

const development = merge.smart(
  partials.configDevServer(),
  partials.loaderImageUrl(),
  partials.loaderSassStyle(),
  partials.loaderCssStyle()
)

const production = merge.smart(
  partials.configSplitChunks(),
  partials.loaderImageFile(),
  partials.pluginClean(),
  partials.dualCssExtractCssChunks(),
  partials.dualSassExtractCssChunks(),
  partials.pluginOptimizeCssAssets()
)

module.exports = (env, argv) => {

  return argv.mode && argv.mode === 'production'
    ? merge.smart(common, production)
    : merge.smart(common, development)

}
