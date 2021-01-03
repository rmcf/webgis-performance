module.exports = {
    publicPath: '/webgis-performance/',
    crossorigin: 'anonymous',
    devServer: {
        proxy: {
            '/pria': {
                target: 'https://kls.pria.ee/',
                pathRewrite: { '^/pria': '' },
                changeOrigin: true
            }
        }
    }
}