const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // dirname (現在這個資料夾底下的dist)
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  module:{
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 使用MiniCssExtractPlugin提取CSS
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]  
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css', // 指定CSS文件名
    }),
  ],
};