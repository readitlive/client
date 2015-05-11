module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './source/main.js']
    // app: ['./source/main.js']
  },
  output: {
    path: './public/build',
    publicPath: '/build/',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony,insertPragma=React.DOM' },
      { test: /\.jsx$/, loader: 'jsx-loader?harmony,insertPragma=React.DOM' },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'styl']
  }
};
