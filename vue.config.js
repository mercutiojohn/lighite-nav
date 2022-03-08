module.exports = {
    pwa: {
      name: 'Lightie',
      themeColor: '#eeeeee',
      msTileColor: '#FFFFFF',
      manifestOptions: {
        background_color: '#eeeeee'
      }
    },
    lintOnSave: false,
    // outputDir: 'dist',
    // publicPath: process.env.NODE_ENV === 'production' ? '/lightie-nav/' : '/',
    publicPath: './',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Lightie · 轻主页'
                return args
            })
    }
}