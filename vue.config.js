// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/uaa/': {
        target: 'http://test.seeksdata.com',
        changeOrigin: true
      },
      '/veeker-admin/': {
        target: 'http://api-test.veekers.cn',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss')
        // path.resolve(__dirname, 'src/styles/mixins.scss')
      ]
    }
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('style-resources-loader')
        .loader('style-resources-loader')
        .options({
          // 这里的路径不能使用 @ 符号，否则会报错
          // patterns: ['./src/styles/variables.scss', '.src/styles/mixins.scss']
          patterns: './src/styles/variables.scss'
        })
        .end()
    })
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
