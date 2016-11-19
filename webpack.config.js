var path = require('path');

module.exports = {
    entry: [
        './src/app.js'
    ],
    output: {
        filename: "./dist/bundle.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
            }, {
            loader: "babel",
            include: [
                path.resolve(__dirname, "src")
            ],
            query: {
                presets: ["react", "es2015", "stage-1"]
            }
        }]
    }
};
