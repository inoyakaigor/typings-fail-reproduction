const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackNotifier2Plugin = require('webpack-notifier-2')

const HtmlWebpackPluginConfig = {
    template: '../index.html',
    filename: 'index.html',
    inject: 'body'
}


/*
MiniCss                  typings                     build
esModule: true           formatter: 'none'           result
------------------------ --------------------------- --------
disabled                 disabled                    fail
disabled                 enabled                     ok
enabled                  disabled                    fail
enabled                  enabled                     ok
*/
const DEFAULT_STYLES_LOADERS_QUEUE = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            esModule: true,
        },
    },
    {
        loader: '@teamsupercell/typings-for-css-modules-loader',
        options: {
            // formatter: 'none'
        }
    },
    {
        loader: 'css-loader',
        options: {
            esModule: true,
            localsConvention: 'camelCase',
            modules: {
                localIdentName: '[folder]-[local]__[hash:base64:5]'
            }
        }
    }
]

const config = (env, options) => {

    const chunkname = 'development'

    const MiniCssExtractPluginConfig = {
        chunkFilename: `styles.${chunkname}.css`,
    }

    const WebpackNotifierPluginConfig = {
        title: `${chunkname} — Statistics`,
        contentImage: {
            success: path.join(__dirname, 'check.png'),
            warning: path.join(__dirname, 'warning.png'),
            error: path.join(__dirname, 'fire.png')
        }
    }

    return {
        context: path.resolve(__dirname + '../'), // to automatically find tsconfig.json
        entry: '../src/index.tsx',
        output: {
            filename: `bundle.${chunkname}.js`,
            path: path.resolve('../build'),
            publicPath: '/stat/'
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true
                        }
                    }
                },
                {
                    test: /\.styl$/,
                    use: [
                        ...DEFAULT_STYLES_LOADERS_QUEUE,
                        'stylus-loader',
                    ]
                },
                {
                    test: /\.css$/,
                    use: DEFAULT_STYLES_LOADERS_QUEUE
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin(       HtmlWebpackPluginConfig   ),
            new MiniCssExtractPlugin(  MiniCssExtractPluginConfig  ),
            new WebpackNotifier2Plugin( WebpackNotifierPluginConfig)
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            modules: [
                path.resolve(__dirname, '../src'),
                path.resolve(__dirname, '../node_modules')
            ]
        }
    }
}
module.exports = config
