const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  // Entry point for the application, where Webpack starts bundling
  entry: {
    bundle: path.resolve(__dirname, 'src/index.js')
  },

  // Output configuration for the bundled files
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name].[contenthash][ext]', // Output file naming for assets (images, fonts, etc.)
    clean: true, // Clean the output folder (dist) before every build
  },

  // Configuration for the development server
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist')
    },
    port: 3000,
    open: true, // Open the browser automatically when the server starts
    hot: true, // Enable hot module replacement (HMR) for live updates
    compress: true, // Enable gzip compression for served files
    historyApiFallback: true, // Fallback to index.html for single-page applications (SPA)
  },
  devtool: 'source-map', // Generate source maps for easier debugging
  module: {
    rules: [
      {
        // Rule for handling Sass files
        test: /\.sass$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader', // Resolves CSS imports and applies styles
          'sass-loader' // Compiles Sass to CSS
        ]
      },
      {
        // Rule for transpiling JavaScript with Babel
        test: /\.js$/,
        exclude: /node_modules/, // Exclude node_modules from being transpiled
        use: {
          loader: 'babel-loader', // Use Babel for transpiling
          options: {
            presets: ['@babel/preset-env'] // Use preset-env to compile modern JavaScript to older versions for browser compatibility
          }
        }
      },
      {
        // Rule for handling image and asset files
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource', // Use Webpack's asset modules to handle files as resources (copy to output folder)
      }
    ]
  },
  plugins: [
    // HTML Webpack Plugin to generate the index.html file
    new HtmlWebpackPlugin({
      title: 'Animals Gallery',
      filename: 'index.html',
      template: 'src/index.html' // Path to the HTML template to be used
    }),
    // Bundle Analyzer Plugin to visualize the size of the bundle
    new BundleAnalyzerPlugin(),
  ]
}
