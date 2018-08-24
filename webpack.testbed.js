const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './testbed/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'testbed/build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        inline: true,
        contentBase: './testbed/build',
        port: 3000,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /(\.html|\.txt)$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/duxtable.css', to: 'duxtable.css', flatten:true}
        ])
    ]
};
