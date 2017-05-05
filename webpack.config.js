const path = require("path");
const webpack = require("webpack");

const pkg = require("./package.json");
const dependencyNames = Object.keys(pkg.dependencies);
// Node process
const node = {
    entry: {
        "node": "./src/node/index.js"
    },
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    target: "electron",
    output: {
        path: path.join(__dirname, "app", "build"),
        publicPath: "/build/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        // textlint in node.js
        new webpack.ExternalsPlugin("commonjs", dependencyNames)
    ],
    node: {
        __dirname: false,
        __filename: false
    }
};
// renderer process
const renderer = {
    entry: {
        "renderer": "./src/renderer/index.js"
    },
    devtool: process.env.WEBPACK_DEVTOOL || "source-map",
    target: "electron",
    output: {
        path: path.join(__dirname, "app", "build"),
        publicPath: "/build/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|png)$/,
                loader: "url-loader",
                options: {
                    limit: 45000
                }
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ],
    node: {
        __dirname: false,
        __filename: false,
        fs: "empty",
        module: "empty"
    }
};

module.exports = [node, renderer];
