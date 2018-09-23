import webpack from "webpack";
import path from "path";
import HtmlWebpackPugPlugin from "html-webpack-pug-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin";

export default env => {

  const addEntity = (add, entity) => {
    return add ? entity : undefined;
  };
  const ifProd = entity => addEntity(env.prod, entity);
  const ifDev = entity => addEntity(env.dev, entity);
  const removeEmpty = array => array.filter(i => !!i);

  const PUBLIC_PATH = env.prod ? "/" : "http://localhost:8080/";


  const contentBase = env.prod
    ? __dirname + "/tmp/static"
    : __dirname + "/src/client";

  return {
    entry: removeEmpty([
      ifDev("react-hot-loader/patch"),
      ifDev("webpack-dev-server/client?http://localhost:8080"),
      ifDev("webpack/hot/only-dev-server"),
      path.join(__dirname, "src/client/index.js")
    ]),
    output: {
      path: path.join(__dirname, "tmp/static"),
      publicPath: PUBLIC_PATH,
      filename: env.prod ? "[name].[chunkhash].js" : "[name].bundle.js"
    },
    devtool: env.dev ? "eval-source-map" : "eval",
    devServer: {
      hot: true,
      publicPath: PUBLIC_PATH,
      contentBase: contentBase,
      historyApiFallback: true,
      headers: { "Access-Control-Allow-Origin": "*" }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,  
          exclude: /node_modules/,  
          use: ["babel-loader"],
          include: path.join(__dirname, "./src/client")
        }
       
      ]
    },
    plugins: removeEmpty([
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifProd(
        new HtmlWebpackPlugin({
          title: "Studb",
          filename: "templates/index.pug",
          template: path.join(__dirname, "src/server/templates/index.prod.pug")
        })
      ),
      ifProd(new HtmlWebpackPugPlugin()),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function(module) {
          return (
            module.context && module.context.indexOf("node_modules") !== -1
          );
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      ifProd(
        new CopyWebpackPlugin([
          {
            from: "static",
          }
        ])
      ),
      ifProd(
        new UglifyJSPlugin({
          sourceMap: true,
        })
      ),
      ifProd(
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production")
          }
        })
      ),
      new SWPrecacheWebpackPlugin({
        cacheId: "studb",
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: "service-worker.js",
        minify: true,
        navigateFallback: PUBLIC_PATH + "index.html",
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
      })
    ])
  };
};
