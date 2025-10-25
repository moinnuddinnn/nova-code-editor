const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/renderer/index.tsx',
  target: 'electron-renderer',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              jsx: 'react-jsx'
            }
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "os": false,
      "crypto": false
    }
  },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, 'dist'),
    clean: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      inject: true
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript', 'css', 'html', 'json', 'markdown', 'python', 'java', 'cpp', 'c', 'go', 'rust', 'php', 'ruby', 'sql', 'xml', 'yaml', 'shell'],
      features: ['coreCommands', 'find', 'format', 'suggest', 'colorDetector', 'folding', 'bracketMatching']
    }),
  ],

  //configuration to run the port 3000
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    hot: true,
    liveReload: false,
    compress: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: false,
      },
    },
    devMiddleware: {
      writeToDisk: false,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        monaco: {
          test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
          name: 'monaco',
          chunks: 'all',
        },
      },
    },
  },
};

