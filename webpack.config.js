// webpack.config.js
module.exports = {
  entry: './www/views/app.jsx',
  output: {
    filename: './webpack/bundle.js'       
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'jsx-loader?harmony' } // loaders 可以接受 querystring 格式的参数
    ]
  }
};
