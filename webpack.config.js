var path = require("path");
var glob = require("glob");

var entries = glob.sync("./src/page/*/index.ts*").reduce(function (prev, item) {
    key = item.replace(/\//g, '_').replace(/^\./, '').replace(/^\_/, '').replace(/\.tsx?$/, '');
    prev[key] = item;
    return prev;
}, {});

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, "bin"),
        filename: "[name].js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]

    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader",
                // loader: "ts-loader",
                include: path.join(__dirname, 'src')
            },
        ]
    }
}