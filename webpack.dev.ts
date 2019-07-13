import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import commonConfig from "./webpack.common";

const config: webpack.Configuration = merge(commonConfig, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: true,
    useLocalIp: false,
    watchContentBase: true,
    open: true
  },
  devtool: "eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()]
});

export default config;
