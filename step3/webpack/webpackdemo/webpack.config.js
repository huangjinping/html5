const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    watch: true, // 开启监听文件更改，自动刷新
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll: 1000 //每秒询问的文件变更的次数
    },
    performance: {
        hints:false
    }, performance: {
        hints:'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    output: {
        filename: 'tk_layout.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"), //静态文件根目录
        port: 9090, // 端口
        host: 'localhost',
        overlay: true,
        compress: true // 服务器返回浏览器的时候是否启动gzip压缩
    }

};

