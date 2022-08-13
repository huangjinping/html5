const  path=require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin')//CSS文件单独提取出来
// https://www.jianshu.com/p/81db0e5a5dfa
module.exports={
    mode:"production",
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader']
            },
            {
                test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
                use:[{
                    loader:'url-loader', //是指定使用的loader和loader的配置参数
                    options:{
                        limit:500,  //是把小于500B的文件打成Base64的格式，写入JS
                        outputPath:'images/',  //打包后的图片放到images文件夹下
                    }
                }]
            },{
                test: /\.scss$/,
                use:ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use:['css-loader', 'postcss-loader', 'sass-loader']
                }),
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextWebapckPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']//
                }),
                include: path.join(__dirname, 'src'), //限制范围，提高打包速度
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000 //将小体积 PNG/JPG/GIF/SVG 图像转为Base64的格式
                }
            }
        ]
    },
    plugins: [
        // 其实这个特性只用于打包生产环境，测试环境这样设置会影响HMR
        // new ExtractTextWebapckPlugin("styles.css"),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'src','index.html'),
            filename:'index.html',
            chunks:['index', 'vendor'],
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }), //html压缩
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), //静态文件根目录
        port: 3824, // 端口
        host: 'localhost',
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    }
}