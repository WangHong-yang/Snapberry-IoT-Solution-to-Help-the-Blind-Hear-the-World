// webpack.config.js

var path = require('path');

module.exports = {
    entry: './views/js/index.js',
    output: {
        path: __dirname + '/views/build',        
        filename: 'bundle.js'
    },
    watch: false,
    target: 'node',
    devServer: {
        contentBase: __dirname
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
};