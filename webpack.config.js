// @ts-check

const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rootPath = resolve(__dirname, ".");
const srcPath = resolve(__dirname, "./src");
const distPath = resolve(__dirname, "./dist");

module.exports = (env, argv) => ({
  entry: {
    app: [resolve(srcPath, "./index.ts")],
  },
  output: {
    path: distPath,
    filename: "js/[name].[chunkhash].js",
  },
  devtool: argv.mode === "development" ? "inline-source-map" : false,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader'
          }
          // "less-loader",
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx", ".less"],
  },

  plugins: [new MiniCssExtractPlugin()],
});
