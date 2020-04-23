const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    publicPath: '/',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: '',
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: true,
    // 是否使用包含运行时编译器的Vue核心的构建
    runtimeCompiler: false,
    // eslint-loader是否在保存的时候检查
    lintOnSave: false,
    // 配置路径别名
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        config.optimization
            .splitChunks({
                cacheGroups: {}
            });
        config.resolve.alias
            .set('@', resolve('src'))
            .set('_c', resolve('src/components/'))
            .set('_as', resolve('src/assets/img/'))
    }
}