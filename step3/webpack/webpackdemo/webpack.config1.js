const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),

        filename: "bundle.js", // string
        // 用于多个入口点
        filename:"[name].js",
        filename:"[chunkhash].js",// 用于长效缓存

        // 输出解析文件的目录，url 相对于 HTML 页面
        publicPath:  "/assets/",
        publicPath:"https://cdn.example.com/",
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