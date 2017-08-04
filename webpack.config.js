/**
 * Created by sail on 2017/7/29.
 */
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = {
    // devtool: 'eval-source-map',//配置生成Source Maps,选择合适的选项
    devtool: 'false',//生产环境使用,bundle文件体积更小
    entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname, 'public'),//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    module: {//在配置文件里添加JSON loader
        rules: [
            {
                test: /\.json$/,
                use: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader","postcss-loader"]
            })
                // use: ["style-loader",    "css-loader","postcss-loader"]
            },
            {   test: /\.styl$/,
                use: ["style-loader","css-loader","stylus-loader"]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        open: true,
        inline:true,
        port: 8080,
        historyApiFallback: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        }),
        new ExtractTextPlugin("styles.css"),
        // new UglifyJSPlugin({
        //     minimize: true,
        //     compress:true
        // })
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
            },
        }),
    ]
};

module.exports = config;

