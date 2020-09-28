let path = require('path');
let dev = require('./webpack.dev');
let prod = require('./webpack.prod');
let { merge } = require('webpack-merge');
let { CleanWebpackPlugin } = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    console.log(env)
    var isDev = env.development;
    var base = {
        devServer: {
            port:9090,

        },
        entry:　{
            'home' :'./src/home.js',
            "org": './src/org.js'
        },
        output: {
            filename: '[name].[hash:4].js',
            path: path.resolve(__dirname, 'dist')
        },
        module:{
            rules:[
                {
                    test:/\.js$/,
                    use:"eslint-loader",
                    enforce: "pre"
                },
                {
                    test: /\.css$/,
                    use:[
                        //{ loader:isDev ? "style-loader" : MiniCssExtractPlugin.loader},
                        { loader: MiniCssExtractPlugin.loader},
                        {
                            loader: 'css-loader'
                        },
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.less$/,
                    use:[
                        //{ loader:isDev ? "style-loader" : MiniCssExtractPlugin.loader},
                        { loader: MiniCssExtractPlugin.loader},
                        {
                            loader: 'css-loader'
                        },
                        "postcss-loader",
                        "less-loader"
                    ]
                },
                {
                    test: /\.(png|gif|jpe?g)$/,
                    use: {
                        loader: "url-loader",
                        options:{
                            esModule:false,
                            limit: 5*1024,
                            name: "img/[name].[ext]"
                        }
                    }
                },
                {
                    test: /\.(html|htm)$/,
                    use:"html-withimg-loader"
                },
                {
                    test: /\.js$/,
                    use: "babel-loader",
                    exclude:/node_modules/
                }
            ]
        },
        plugins: [
            // !isDev&&new MiniCssExtractPlugin({
            //     filename: 'css/[name].[contentHash:4].css'
            // }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contentHash:4].css'
            }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/home.html',//模板静态资源文件
                filename: 'index.html',
                inject: "body",//false表示不注入js文件
                chunksSortMode: "manual",//手动配置代码块的顺序
                chunks:['org','home']//设置引入文件的顺序
            })
        ].filter(Boolean)
    }
    

    if(isDev){
        return merge(base, dev);
    } else {
        return merge(base, prod);
    }
}