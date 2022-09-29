module.exports = {
    pwa: {
        name: 'Lightie',
        themeColor: '#eeeeee',
        msTileColor: '#FFFFFF',
        // manifestOptions: {
        //     background_color: '#eeeeee',
        // },
    },

    // },
    // t: {
    //     "name": "Lightie",
    //     "short_name": "Lightie",
    //     "theme_color": "#eeeeee",
    //     "icons": [{
    //             "src": "./img/icons/android-chrome-192x192.png",
    //             "sizes": "192x192",
    //             "type": "image/png"
    //         },
    //         {
    //             "src": "./img/icons/android-chrome-512x512.png",
    //             "sizes": "512x512",
    //             "type": "image/png"
    //         },
    //         {
    //             "src": "./img/icons/android-chrome-maskable-192x192.png",
    //             "sizes": "192x192",
    //             "type": "image/png",
    //             "purpose": "maskable"
    //         },
    //         { "src": "./img/icons/android-chrome-maskable-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
    //     ],
    //     "start_url": ".",
    //     "display": "standalone",
    //     "background_color": "#eeeeee"
    // },
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