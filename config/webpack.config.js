const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const paths = require("./paths");

const env = process.env.NODE_ENV ?? "development";
const isDevelopment = env === "development";

/** regex */
const tsRegex = /\.tsx?$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  mode: env,
  entry: {
    main: path.resolve(paths.srcPath, "main.ts"),
    css: path.resolve(paths.srcPath, "main.scss")
  },
  output: {
    path: path.resolve(paths.outputPath),
    pathinfo: isDevelopment,
    filename: isDevelopment
      ? `js/[name].bundle.js`
      : `js/[name].[contenthash:16].js`,
    chunkFilename: isDevelopment
      ? `js/[name].chunk.js`
      : `js/[contenthash:16].chunk.js`,
    globalObject: "this"
  },
  devtool: isDevelopment ? "eval-cheap-source-map" : false,
  module: {
    rules: [
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: {
                  "postcss-flexbugs-fixes": {},
                  "postcss-preset-env": {
                    stage: 3
                  },
                  autoprefixer: {
                    flexbox: "no-2009"
                  }
                }
              },
              sourceMap: isDevelopment
            }
          },
          { loader: "sass-loader" }
        ]
      },
      {
        test: tsRegex,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      node: "current"
                    }
                  }
                ],
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic"
                  }
                ],
                [
                  "@babel/preset-typescript",
                  {
                    isTSX: true,
                    allExtensions: true,
                    onlyRemoveTypeImports: true
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  resolve: {
    modules: ["node_modules", path.resolve(paths.srcPath)],
    extensions: [".json", ".js", ".jsx", ".ts", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"]
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "css/main.css" : "css/main.[contenthash:16].css"
    }),
    new WebpackAssetsManifest({
      output: "assets-manifest.json",
      entrypoints: true
    })
  ]
};
