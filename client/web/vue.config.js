module.exports = {
    publicPath: './',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        open: true,
        proxy: 'http://localhost:3000'
    }
}