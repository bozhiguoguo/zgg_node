/**
 * Created by Administrator on 2017-05-03.
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var path = require('path');
var devConfig = {
    entry: [
        './public/js/entry.js'
    ],
    output: {
        path: __dirname + '/public/dist/js',
        publicPath: '/dist/js',
        filename: "bundle.js?t=[hash:5]"
    },
    module: {
        loaders: [
            {
                test: /\.js?$/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        loader: "css-loader",
                        publicPath: "/bundle/css"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|eot|ttf)(\?\S*)?$/,
                loader: 'url-loader?limit=8192',//小于8k 转base64
                query: {
                    name: './css/[name].[ext]'
                }
            },
            // {test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "../css/[name].css",
            allChunks: true
        }),
        new OptimizeCSSPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
    ],
    resolve: {
        alias: {
            'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery'),
            'vue': path.join(__dirname, 'node_modules/vue/dist/vue')
        }
    },
}
module.exports = devConfig;