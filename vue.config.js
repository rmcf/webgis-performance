module.exports = {
    devServer: {
        proxy: {
            '/soilpygeoapi': {
                target: 'https://soil-pygeoapi-docker-bozea3cspa-ew.a.run.app/',
                pathRewrite: { '^/soilpygeoapi': '' }

            },
            '/maerchenland': {
                target: 'http://www.maerchenland-rostock.de/',
                pathRewrite: { '^/maerchenland': '' }
            }
        }
    }
}

// module.exports = {
//     publicPath: '/webgis-performance/'
// }