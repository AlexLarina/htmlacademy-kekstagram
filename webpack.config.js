
const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./js/pictures.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname)
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: `http://localhost:8080/`,
    hot: true,
    compress: true
  }
};
