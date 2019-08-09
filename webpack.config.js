module.exports = {
  entry: './frontend/components/App.jsx',
  output: {
    path: __dirname + '/app/assets/javascripts',
    filename: './bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: (/\.js?$/, /\.jsx?$/),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /(node_modules)/
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx' ]
  },
  node: {
    console: true,
    fs: 'empty',
    tls: 'empty',
    net: 'empty'
  },
  mode: 'development'
};
