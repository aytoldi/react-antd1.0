let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let _babel = {
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: "babel-loader",
    options: {
        presets: ['env', 'es2015', 'react', 'stage-0'],
        plugins: [
            [
                "transform-runtime",
                {
                    "helpers": false,
                    "polyfill": false,
                    "regenerator": true,
                    "moduleName": "babel-runtime"
                }
            ],
            ['import', {libraryName: 'antd', style: 'css'}]
        ]
    }
};

let _css = [
    //CSS处理
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: "[name]__[local]___[hash:base64:5]",
                    importLoaders: 1
                }
            }
        ]
    },
    //antd样式处理 https://www.jianshu.com/p/603a61471ff6
    {
        test: /\.css$/,
        exclude: /src/,
        use: [
            {loader: "style-loader",},
            {
                loader: "css-loader",
                options: {
                    importLoaders: 1
                }
            }
        ]
    }
]

let _less = [
    //less 处理
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]_[local]-[hash:base64:5]'
                }
            },
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true
                }
            }
        ],
    },
    //antd less 处理 https://github.com/ant-design/babel-plugin-import/issues/58
    {
        test: /\.less$/,
        include: /node_modules/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader",
        }, {
            loader: "less-loader",
            options: {
                modifyVars: {},
                javascriptEnabled: true,
            }
        }]
    }
]

let _url = {
    test: /\.(png|jpg|gif|jpeg|svg)$/,
    use: [
        {
            loader: "url-loader",
            options: {
                name: "[name].[hash:5].[ext]",
                limit: 1024, // size <= 1kib
                outputPath: "img"
            }
        }
    ]
}

let _html = {
    test: /\.(htm|html)$/i,
    use: [{loader: 'html-withimg-loader'}]
}
module.exports = {
    devtool: 'inline-source-map',
    mode: 'development',
    entry: "./src/main.js",
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js'
    },
    resolve: {},
    module: {
        rules: [
            _babel,
            ..._css,
            ..._less,
            _url,
            _html
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Hello World app',
            template: 'index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            hash: true, //为了更好的 cache，可以在文件名后加个 hash。
        }),//在build目录下自动生成index.html，指定其title
        new MiniCssExtractPlugin({//ss 单独打包到文件
            filename: '[name].min.css'
        })
    ]
}


