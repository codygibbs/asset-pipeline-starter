const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: [
        './source/assets/js/app.js',
        './source/assets/sass/main.scss',
    ],
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader", // translates CSS into CommonJS
                    options: {
                        sourceMap: true,
                        minimize: true
                    }
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }]
    },
    plugins: [
        extractSass
    ]
};
