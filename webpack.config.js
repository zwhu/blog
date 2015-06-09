// webpack.config.js


var webpack = require('webpack');


module.exports = {
  entry: './www/views/app.jsx',
  output: {
    filename: './public/bundle/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'jsx-loader?harmony'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'}, // 用 ! 来连接多个人 loader
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
    ]
  }
};
