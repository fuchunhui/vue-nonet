const lessOptions = {
    javascriptEnabled: true
}

module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/vue-nonet/' : '/',
    devServer: {
        port: 8020
    },
    transpileDependencies: [
        /[/\\]node_modules[/\\]veui[/\\]/,
        /[/\\]node_modules[/\\]vue-awesome[/\\]/,
        /[/\\]node_modules[/\\]resize-detector[/\\]/
    ],
    chainWebpack: config => {
        config.module
            .rule('veui')
            .test(/\.vue$/)
            .pre()
            .use('veui-loader')
            .loader('veui-loader')
            .tap(() => {
                return {
                    modules: [
                        {
                            package: 'veui-theme-one',
                            fileName: '${module}.less'
                        },
                        {
                            package: 'veui-theme-one',
                            fileName: '${module}.js',
                            transform: false
                        }
                    ]
                }
            })
        
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => {
            config.module
                .rule('less')
                .oneOf(type)
                .use('less-loader')
                .tap(options => Object.assign({}, options, lessOptions))
        })
    }

};